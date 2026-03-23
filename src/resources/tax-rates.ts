import type { HttpClient } from "../client.js";
import type {
  TaxRate,
  TaxRateCreateParams,
  TaxRateUpdateParams,
  RequestOptions,
} from "../types.js";
import { unwrap, unwrapList } from "./_utils.js";

export class TaxRatesResource {
  constructor(private readonly client: HttpClient) {}

  /** List all tax rates. */
  async list(options?: RequestOptions): Promise<TaxRate[]> {
    const response = await this.client.get<unknown>("/api/v1/tax-rates", undefined, options);
    return unwrapList<TaxRate>(response, "taxRates");
  }

  /** Create a new tax rate. */
  async create(params: TaxRateCreateParams, options?: RequestOptions): Promise<TaxRate> {
    const response = await this.client.post<unknown>("/api/v1/tax-rates", params, options);
    return unwrap<TaxRate>(response, "taxRate");
  }

  /** Get a tax rate by ID. */
  async get(id: string, options?: RequestOptions): Promise<TaxRate> {
    const response = await this.client.get<unknown>(`/api/v1/tax-rates/${id}`, undefined, options);
    return unwrap<TaxRate>(response, "taxRate");
  }

  /** Update a tax rate. */
  async update(id: string, params: TaxRateUpdateParams, options?: RequestOptions): Promise<TaxRate> {
    const response = await this.client.patch<unknown>(`/api/v1/tax-rates/${id}`, params, options);
    return unwrap<TaxRate>(response, "taxRate");
  }

  /** Delete a tax rate. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/tax-rates/${id}`, options);
  }
}
