import type { HttpClient } from "../client.js";
import type {
  ExchangeRate,
  ExchangeRateParams,
  RequestOptions,
} from "../types.js";
import { unwrapList } from "./_utils.js";

export class ExchangeRatesResource {
  constructor(private readonly client: HttpClient) {}

  /** Get exchange rates. */
  async get(params?: ExchangeRateParams, options?: RequestOptions): Promise<ExchangeRate[]> {
    const response = await this.client.get<unknown>("/api/v1/exchange-rates", params as Record<string, unknown>, options);
    return unwrapList<ExchangeRate>(response, "data");
  }
}
