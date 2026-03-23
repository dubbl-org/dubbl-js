import type { HttpClient } from "../client.js";
import type {
  RecurringTransaction,
  RecurringTransactionCreateParams,
  RequestOptions,
} from "../types.js";
import { unwrap } from "./_utils.js";

export class RecurringResource {
  constructor(private readonly client: HttpClient) {}

  /** Create a recurring transaction. */
  async create(params: RecurringTransactionCreateParams, options?: RequestOptions): Promise<RecurringTransaction> {
    const response = await this.client.post<unknown>("/api/v1/recurring", params, options);
    return unwrap<RecurringTransaction>(response, "template");
  }

  /** Get a recurring transaction by ID. */
  async get(id: string, options?: RequestOptions): Promise<RecurringTransaction> {
    const response = await this.client.get<unknown>(`/api/v1/recurring/${id}`, undefined, options);
    return unwrap<RecurringTransaction>(response, "template");
  }

  /** Pause a recurring transaction. */
  async pause(id: string, options?: RequestOptions): Promise<RecurringTransaction> {
    const response = await this.client.post<unknown>(`/api/v1/recurring/${id}/pause`, undefined, options);
    return unwrap<RecurringTransaction>(response, "template");
  }
}
