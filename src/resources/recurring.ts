import type { HttpClient } from "../client.js";
import type {
  RecurringTransaction,
  RecurringTransactionCreateParams,
  RequestOptions,
} from "../types.js";

export class RecurringResource {
  constructor(private readonly client: HttpClient) {}

  /** Create a recurring transaction. */
  async create(params: RecurringTransactionCreateParams, options?: RequestOptions): Promise<RecurringTransaction> {
    return this.client.post<RecurringTransaction>("/api/v1/recurring", params, options);
  }

  /** Get a recurring transaction by ID. */
  async get(id: string, options?: RequestOptions): Promise<RecurringTransaction> {
    return this.client.get<RecurringTransaction>(`/api/v1/recurring/${id}`, undefined, options);
  }

  /** Pause a recurring transaction. */
  async pause(id: string, options?: RequestOptions): Promise<RecurringTransaction> {
    return this.client.post<RecurringTransaction>(`/api/v1/recurring/${id}/pause`, undefined, options);
  }
}
