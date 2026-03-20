import type { HttpClient } from "../client.js";
import type {
  ApiKey,
  ApiKeyCreateParams,
  ApiKeyCreateResponse,
  RequestOptions,
} from "../types.js";

export class ApiKeysResource {
  constructor(private readonly client: HttpClient) {}

  /** List all API keys. Requires Pro plan or above. */
  async list(options?: RequestOptions): Promise<ApiKey[]> {
    return this.client.get<ApiKey[]>("/api/v1/api-keys", undefined, options);
  }

  /** Create a new API key. The full key is only returned once on creation. */
  async create(params: ApiKeyCreateParams, options?: RequestOptions): Promise<ApiKeyCreateResponse> {
    return this.client.post<ApiKeyCreateResponse>("/api/v1/api-keys", params, options);
  }

  /** Get an API key by ID. */
  async get(id: string, options?: RequestOptions): Promise<ApiKey> {
    return this.client.get<ApiKey>(`/api/v1/api-keys/${id}`, undefined, options);
  }

  /** Delete an API key. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/api-keys/${id}`, options);
  }
}
