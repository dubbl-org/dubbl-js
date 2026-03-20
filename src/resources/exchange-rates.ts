import type { HttpClient } from "../client.js";
import type {
  ExchangeRate,
  ExchangeRateParams,
  RequestOptions,
} from "../types.js";

export class ExchangeRatesResource {
  constructor(private readonly client: HttpClient) {}

  /** Get exchange rates. */
  async get(params?: ExchangeRateParams, options?: RequestOptions): Promise<ExchangeRate[]> {
    return this.client.get<ExchangeRate[]>("/api/v1/exchange-rates", params as Record<string, unknown>, options);
  }
}
