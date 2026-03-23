import type { HttpClient } from "../client.js";
import type {
  Bill,
  BillCreateParams,
  BillUpdateParams,
  BillListParams,
  BillPayParams,
  BillCounts,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";
import { unwrap } from "./_utils.js";

export class BillsResource {
  constructor(private readonly client: HttpClient) {}

  /** List bills with optional filters. */
  async list(params?: BillListParams, options?: RequestOptions): Promise<PaginatedResponse<Bill>> {
    return this.client.get<PaginatedResponse<Bill>>("/api/v1/bills", params as Record<string, unknown>, options);
  }

  /** Create a new bill. */
  async create(params: BillCreateParams, options?: RequestOptions): Promise<Bill> {
    const response = await this.client.post<unknown>("/api/v1/bills", params, options);
    return unwrap<Bill>(response, "bill");
  }

  /** Get a bill by ID. */
  async get(id: string, options?: RequestOptions): Promise<Bill> {
    const response = await this.client.get<unknown>(`/api/v1/bills/${id}`, undefined, options);
    return unwrap<Bill>(response, "bill");
  }

  /** Update a draft bill. */
  async update(id: string, params: BillUpdateParams, options?: RequestOptions): Promise<Bill> {
    const response = await this.client.patch<unknown>(`/api/v1/bills/${id}`, params, options);
    return unwrap<Bill>(response, "bill");
  }

  /** Delete a bill. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/bills/${id}`, options);
  }

  /** Mark a bill as received. */
  async receive(id: string, options?: RequestOptions): Promise<Bill> {
    const response = await this.client.post<unknown>(`/api/v1/bills/${id}/receive`, undefined, options);
    return unwrap<Bill>(response, "bill");
  }

  /** Record a payment against a bill. */
  async pay(id: string, params: BillPayParams, options?: RequestOptions): Promise<Bill> {
    const response = await this.client.post<unknown>(`/api/v1/bills/${id}/pay`, params, options);
    return unwrap<Bill>(response, "bill");
  }

  /** Void a bill. */
  async void(id: string, options?: RequestOptions): Promise<Bill> {
    const response = await this.client.post<unknown>(`/api/v1/bills/${id}/void`, undefined, options);
    return unwrap<Bill>(response, "bill");
  }

  /** Approve a bill. */
  async approve(id: string, options?: RequestOptions): Promise<Bill> {
    const response = await this.client.post<unknown>(`/api/v1/bills/${id}/approve`, undefined, options);
    return unwrap<Bill>(response, "bill");
  }

  /** Reject a bill. */
  async reject(id: string, options?: RequestOptions): Promise<Bill> {
    const response = await this.client.post<unknown>(`/api/v1/bills/${id}/reject`, undefined, options);
    return unwrap<Bill>(response, "bill");
  }

  /** Get bill counts grouped by status. */
  async counts(options?: RequestOptions): Promise<BillCounts> {
    return this.client.get<BillCounts>("/api/v1/bills/counts", undefined, options);
  }
}
