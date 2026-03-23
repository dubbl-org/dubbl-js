import type { HttpClient } from "../client.js";
import type {
  FiscalYear,
  FiscalYearCreateParams,
  FiscalYearUpdateParams,
  RequestOptions,
} from "../types.js";
import { unwrap, unwrapList } from "./_utils.js";

export class FiscalYearsResource {
  constructor(private readonly client: HttpClient) {}

  /** List all fiscal years. */
  async list(options?: RequestOptions): Promise<FiscalYear[]> {
    const response = await this.client.get<unknown>("/api/v1/fiscal-years", undefined, options);
    return unwrapList<FiscalYear>(response, "fiscalYears");
  }

  /** Create a new fiscal year. */
  async create(params: FiscalYearCreateParams, options?: RequestOptions): Promise<FiscalYear> {
    const response = await this.client.post<unknown>("/api/v1/fiscal-years", params, options);
    return unwrap<FiscalYear>(response, "fiscalYear");
  }

  /** Get a fiscal year by ID. */
  async get(id: string, options?: RequestOptions): Promise<FiscalYear> {
    const response = await this.client.get<unknown>(`/api/v1/fiscal-years/${id}`, undefined, options);
    return unwrap<FiscalYear>(response, "fiscalYear");
  }

  /** Update a fiscal year. */
  async update(id: string, params: FiscalYearUpdateParams, options?: RequestOptions): Promise<FiscalYear> {
    const response = await this.client.patch<unknown>(`/api/v1/fiscal-years/${id}`, params, options);
    return unwrap<FiscalYear>(response, "fiscalYear");
  }

  /** Delete a fiscal year. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/fiscal-years/${id}`, options);
  }

  /** Close a fiscal year. */
  async close(id: string, options?: RequestOptions): Promise<FiscalYear> {
    const response = await this.client.post<unknown>(`/api/v1/fiscal-years/${id}/close`, undefined, options);
    return unwrap<FiscalYear>(response, "fiscalYear");
  }

  /** Reopen a closed fiscal year. */
  async reopen(id: string, options?: RequestOptions): Promise<FiscalYear> {
    const response = await this.client.post<unknown>(`/api/v1/fiscal-years/${id}/reopen`, undefined, options);
    return unwrap<FiscalYear>(response, "fiscalYear");
  }
}
