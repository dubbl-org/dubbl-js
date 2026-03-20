import type { HttpClient } from "../client.js";
import type {
  TaxRate,
  TaxRateCreateParams,
  TaxRateUpdateParams,
  RequestOptions,
} from "../types.js";

export class TaxRatesResource {
  constructor(private readonly client: HttpClient) {}

  /** List all tax rates. */
  async list(options?: RequestOptions): Promise<TaxRate[]> {
    return this.client.get<TaxRate[]>("/api/v1/tax-rates", undefined, options);
  }

  /** Create a new tax rate. */
  async create(params: TaxRateCreateParams, options?: RequestOptions): Promise<TaxRate> {
    return this.client.post<TaxRate>("/api/v1/tax-rates", params, options);
  }

  /** Get a tax rate by ID. */
  async get(id: string, options?: RequestOptions): Promise<TaxRate> {
    return this.client.get<TaxRate>(`/api/v1/tax-rates/${id}`, undefined, options);
  }

  /** Update a tax rate. */
  async update(id: string, params: TaxRateUpdateParams, options?: RequestOptions): Promise<TaxRate> {
    return this.client.patch<TaxRate>(`/api/v1/tax-rates/${id}`, params, options);
  }

  /** Delete a tax rate. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/tax-rates/${id}`, options);
  }
}
