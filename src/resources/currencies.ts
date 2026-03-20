import type { HttpClient } from "../client.js";
import type { Currency, RequestOptions } from "../types.js";

export class CurrenciesResource {
  constructor(private readonly client: HttpClient) {}

  /** Get the list of supported currencies. */
  async list(options?: RequestOptions): Promise<Currency[]> {
    return this.client.get<Currency[]>("/api/v1/currencies", undefined, options);
  }
}
