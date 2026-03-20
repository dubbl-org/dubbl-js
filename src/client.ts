import {
  DubblError,
  AuthenticationError,
  PermissionError,
  NotFoundError,
  ValidationError,
  PaymentRequiredError,
  ConflictError,
  PeriodLockedError,
  RateLimitError,
  InternalServerError,
} from "./errors.js";
import type { DubblOptions, RequestOptions } from "./types.js";

const DEFAULT_BASE_URL = "https://app.dubbl.dev";
const DEFAULT_TIMEOUT = 30_000;
const DEFAULT_MAX_RETRIES = 2;
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

export class HttpClient {
  readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly organizationId: string | undefined;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly _fetch: typeof globalThis.fetch;

  constructor(options: DubblOptions) {
    if (!options.apiKey) {
      throw new Error(
        "An API key is required. Pass it as `apiKey` in the Dubbl constructor.",
      );
    }

    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.organizationId = options.organizationId;
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this._fetch = options.fetch ?? globalThis.fetch;
  }

  async request<T>(
    method: string,
    path: string,
    body?: unknown,
    query?: Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<T> {
    const url = this.buildUrl(path, query);
    const headers = this.buildHeaders(options?.headers);
    const timeoutMs = options?.timeout ?? this.timeout;

    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      if (attempt > 0) {
        const delay = this.calculateBackoff(attempt);
        await sleep(delay);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await this._fetch(url, {
          method,
          headers,
          body: body != null ? JSON.stringify(body) : undefined,
          signal: options?.signal
            ? anySignal([options.signal, controller.signal])
            : controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType?.includes("application/json")) {
            return (await response.json()) as T;
          }
          // For binary responses (PDFs, exports, etc.)
          return (await response.blob()) as unknown as T;
        }

        const errorBody = await this.parseErrorBody(response);
        const requestId = response.headers.get("x-request-id") ?? undefined;

        if (RETRYABLE_STATUS_CODES.has(response.status) && attempt < this.maxRetries) {
          lastError = this.createError(response.status, errorBody, requestId);
          continue;
        }

        throw this.createError(response.status, errorBody, requestId);
      } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof DubblError) {
          throw error;
        }

        if (error instanceof DOMException && error.name === "AbortError") {
          lastError = new DubblError("Request timed out", 0, "timeout");
          if (attempt < this.maxRetries) continue;
          throw lastError;
        }

        // Network errors are retryable
        lastError = new DubblError(
          `Network error: ${error instanceof Error ? error.message : String(error)}`,
          0,
          "network_error",
        );
        if (attempt < this.maxRetries) continue;
        throw lastError;
      }
    }

    throw lastError ?? new DubblError("Request failed after retries", 0);
  }

  get<T>(path: string, query?: Record<string, unknown>, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", path, undefined, query, options);
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", path, body, undefined, options);
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("PATCH", path, body, undefined, options);
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", path, body, undefined, options);
  }

  delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", path, undefined, undefined, options);
  }

  private buildUrl(path: string, query?: Record<string, unknown>): string {
    const url = new URL(`${this.baseUrl}${path}`);

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value != null && value !== "") {
          url.searchParams.set(key, String(value));
        }
      }
    }

    return url.toString();
  }

  private buildHeaders(extra?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "dubbl-js/0.1.0",
    };

    if (this.organizationId) {
      headers["X-Organization-ID"] = this.organizationId;
    }

    if (extra) {
      Object.assign(headers, extra);
    }

    return headers;
  }

  private async parseErrorBody(response: Response): Promise<{ error?: string; errors?: Array<{ field: string; message: string }> }> {
    try {
      return (await response.json()) as { error?: string; errors?: Array<{ field: string; message: string }> };
    } catch {
      return { error: response.statusText };
    }
  }

  private createError(
    status: number,
    body: { error?: string; errors?: Array<{ field: string; message: string }> },
    requestId?: string,
  ): DubblError {
    const message = body.error ?? "Unknown error";

    switch (status) {
      case 400:
        return new ValidationError(message, body.errors, requestId);
      case 401:
        return new AuthenticationError(message, requestId);
      case 402:
        return new PaymentRequiredError(message, requestId);
      case 403:
        return new PermissionError(message, requestId);
      case 404:
        return new NotFoundError(message, requestId);
      case 409:
        return new ConflictError(message, requestId);
      case 422:
        return new PeriodLockedError(message, requestId);
      case 429:
        return new RateLimitError(message, undefined, requestId);
      case 500:
      case 502:
      case 503:
      case 504:
        return new InternalServerError(message, requestId);
      default:
        return new DubblError(message, status, undefined, requestId);
    }
  }

  private calculateBackoff(attempt: number): number {
    // Exponential backoff with jitter: base * 2^attempt + random jitter
    const base = 500;
    const delay = base * Math.pow(2, attempt - 1);
    const jitter = Math.random() * base;
    return Math.min(delay + jitter, 30_000);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function anySignal(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
    signal.addEventListener("abort", () => controller.abort(signal.reason), {
      once: true,
    });
  }
  return controller.signal;
}
