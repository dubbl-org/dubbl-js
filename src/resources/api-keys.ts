import type { HttpClient } from "../client.js";
import type {
  ApiKey,
  ApiKeyCreateParams,
  ApiKeyCreateResponse,
  RequestOptions,
} from "../types.js";
import { unwrap, unwrapList } from "./_utils.js";

export class ApiKeysResource {
  constructor(private readonly client: HttpClient) {}

  /** List all API keys. Requires Pro plan or above. */
  async list(options?: RequestOptions): Promise<ApiKey[]> {
    const response = await this.client.get<unknown>("/api/v1/api-keys", undefined, options);
    return unwrapList<ApiKey>(response, "keys");
  }

  /** Create a new API key. The full key is only returned once on creation. */
  async create(params: ApiKeyCreateParams, options?: RequestOptions): Promise<ApiKeyCreateResponse> {
    const response = await this.client.post<Record<string, unknown>>("/api/v1/api-keys", params, options);
    const key = unwrap<ApiKey>(response, "key");
    return {
      ...key,
      key: typeof response.plainKey === "string" ? response.plainKey : "",
    };
  }

  /** Get an API key by ID. */
  async get(id: string, options?: RequestOptions): Promise<ApiKey> {
    const response = await this.client.get<unknown>(`/api/v1/api-keys/${id}`, undefined, options);
    return unwrap<ApiKey>(response, "key");
  }

  /** Delete an API key. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/api-keys/${id}`, options);
  }
}
