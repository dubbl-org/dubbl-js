import type { HttpClient } from "../client.js";
import type {
  Entry,
  EntryCreateParams,
  EntryListParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class EntriesResource {
  constructor(private readonly client: HttpClient) {}

  /** List journal entries. */
  async list(params?: EntryListParams, options?: RequestOptions): Promise<PaginatedResponse<Entry>> {
    return this.client.get<PaginatedResponse<Entry>>("/api/v1/entries", params as Record<string, unknown>, options);
  }

  /** Create a new journal entry. Debits must equal credits with a minimum of 2 lines. */
  async create(params: EntryCreateParams, options?: RequestOptions): Promise<Entry> {
    return this.client.post<Entry>("/api/v1/entries", params, options);
  }

  /** Get a journal entry by ID with all lines. */
  async get(id: string, options?: RequestOptions): Promise<Entry> {
    return this.client.get<Entry>(`/api/v1/entries/${id}`, undefined, options);
  }

  /** Delete a draft journal entry. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/entries/${id}`, options);
  }

  /** Post a draft entry to the ledger. */
  async post(id: string, options?: RequestOptions): Promise<Entry> {
    return this.client.post<Entry>(`/api/v1/entries/${id}/post`, undefined, options);
  }

  /** Void a posted entry. */
  async void(id: string, options?: RequestOptions): Promise<Entry> {
    return this.client.post<Entry>(`/api/v1/entries/${id}/void`, undefined, options);
  }
}
