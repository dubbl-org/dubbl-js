import type { HttpClient } from "../client.js";
import type { Currency, RequestOptions } from "../types.js";
import { unwrapList } from "./_utils.js";

export class CurrenciesResource {
  constructor(private readonly client: HttpClient) {}

  /** Get the list of supported currencies. */
  async list(options?: RequestOptions): Promise<Currency[]> {
    const response = await this.client.get<unknown>("/api/v1/currencies", undefined, options);
    return unwrapList<Currency>(response, "currencies");
  }
}
