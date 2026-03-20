import type { HttpClient } from "../client.js";
import type {
  FiscalYear,
  FiscalYearCreateParams,
  FiscalYearUpdateParams,
  RequestOptions,
} from "../types.js";

export class FiscalYearsResource {
  constructor(private readonly client: HttpClient) {}

  /** List all fiscal years. */
  async list(options?: RequestOptions): Promise<FiscalYear[]> {
    return this.client.get<FiscalYear[]>("/api/v1/fiscal-years", undefined, options);
  }

  /** Create a new fiscal year. */
  async create(params: FiscalYearCreateParams, options?: RequestOptions): Promise<FiscalYear> {
    return this.client.post<FiscalYear>("/api/v1/fiscal-years", params, options);
  }

  /** Get a fiscal year by ID. */
  async get(id: string, options?: RequestOptions): Promise<FiscalYear> {
    return this.client.get<FiscalYear>(`/api/v1/fiscal-years/${id}`, undefined, options);
  }

  /** Update a fiscal year. */
  async update(id: string, params: FiscalYearUpdateParams, options?: RequestOptions): Promise<FiscalYear> {
    return this.client.patch<FiscalYear>(`/api/v1/fiscal-years/${id}`, params, options);
  }

  /** Delete a fiscal year. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/fiscal-years/${id}`, options);
  }

  /** Close a fiscal year. */
  async close(id: string, options?: RequestOptions): Promise<FiscalYear> {
    return this.client.post<FiscalYear>(`/api/v1/fiscal-years/${id}/close`, undefined, options);
  }

  /** Reopen a closed fiscal year. */
  async reopen(id: string, options?: RequestOptions): Promise<FiscalYear> {
    return this.client.post<FiscalYear>(`/api/v1/fiscal-years/${id}/reopen`, undefined, options);
  }
}
