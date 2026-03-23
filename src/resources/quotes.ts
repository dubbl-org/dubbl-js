import type { HttpClient } from "../client.js";
import type {
  Quote,
  QuoteCreateParams,
  QuoteUpdateParams,
  QuoteListParams,
  QuoteSendParams,
  Invoice,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";
import { unwrap } from "./_utils.js";

export class QuotesResource {
  constructor(private readonly client: HttpClient) {}

  /** List quotes with optional filters. */
  async list(params?: QuoteListParams, options?: RequestOptions): Promise<PaginatedResponse<Quote>> {
    return this.client.get<PaginatedResponse<Quote>>("/api/v1/quotes", params as Record<string, unknown>, options);
  }

  /** Create a new quote. */
  async create(params: QuoteCreateParams, options?: RequestOptions): Promise<Quote> {
    const response = await this.client.post<unknown>("/api/v1/quotes", params, options);
    return unwrap<Quote>(response, "quote");
  }

  /** Get a quote by ID. */
  async get(id: string, options?: RequestOptions): Promise<Quote> {
    const response = await this.client.get<unknown>(`/api/v1/quotes/${id}`, undefined, options);
    return unwrap<Quote>(response, "quote");
  }

  /** Update a quote. */
  async update(id: string, params: QuoteUpdateParams, options?: RequestOptions): Promise<Quote> {
    const response = await this.client.patch<unknown>(`/api/v1/quotes/${id}`, params, options);
    return unwrap<Quote>(response, "quote");
  }

  /** Delete a quote. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/quotes/${id}`, options);
  }

  /** Send a quote to the contact. */
  async send(id: string, params?: QuoteSendParams, options?: RequestOptions): Promise<Quote> {
    const response = await this.client.post<unknown>(`/api/v1/quotes/${id}/send`, params, options);
    return unwrap<Quote>(response, "quote");
  }

  /** Accept a quote. */
  async accept(id: string, options?: RequestOptions): Promise<Quote> {
    const response = await this.client.post<unknown>(`/api/v1/quotes/${id}/accept`, undefined, options);
    return unwrap<Quote>(response, "quote");
  }

  /** Decline a quote. */
  async decline(id: string, options?: RequestOptions): Promise<Quote> {
    const response = await this.client.post<unknown>(`/api/v1/quotes/${id}/decline`, undefined, options);
    return unwrap<Quote>(response, "quote");
  }

  /** Convert a quote to an invoice. */
  async convert(id: string, options?: RequestOptions): Promise<Invoice> {
    const response = await this.client.post<unknown>(`/api/v1/quotes/${id}/convert`, undefined, options);
    return unwrap<Invoice>(response, "invoice");
  }
}
