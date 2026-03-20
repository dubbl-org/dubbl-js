import type { HttpClient } from "../client.js";
import type {
  TrashedItem,
  TrashListParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class TrashResource {
  constructor(private readonly client: HttpClient) {}

  /** List items in the trash. */
  async list(params?: TrashListParams, options?: RequestOptions): Promise<PaginatedResponse<TrashedItem>> {
    return this.client.get<PaginatedResponse<TrashedItem>>("/api/v1/trash", params as Record<string, unknown>, options);
  }

  /** Restore an item from the trash. */
  async restore(id: string, options?: RequestOptions): Promise<void> {
    await this.client.post(`/api/v1/trash/${id}/restore`, undefined, options);
  }

  /** Permanently delete all items in the trash. */
  async empty(options?: RequestOptions): Promise<void> {
    await this.client.post("/api/v1/trash/empty", undefined, options);
  }
}
