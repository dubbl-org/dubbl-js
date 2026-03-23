import type { HttpClient } from "../client.js";
import type {
  Account,
  AccountCreateParams,
  AccountUpdateParams,
  AccountListParams,
  AccountLedgerParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";
import { unwrap, unwrapPaginated } from "./_utils.js";

export class AccountsResource {
  constructor(private readonly client: HttpClient) {}

  /** List all accounts in the chart of accounts. */
  async list(params?: AccountListParams, options?: RequestOptions): Promise<PaginatedResponse<Account>> {
    const response = await this.client.get<unknown>("/api/v1/accounts", params as Record<string, unknown>, options);
    return unwrapPaginated<Account>(response, "accounts");
  }

  /** Create a new account. */
  async create(params: AccountCreateParams, options?: RequestOptions): Promise<Account> {
    const response = await this.client.post<unknown>("/api/v1/accounts", params, options);
    return unwrap<Account>(response, "account");
  }

  /** Get an account by ID, including transaction ledger and running balance. */
  async get(id: string, params?: AccountLedgerParams, options?: RequestOptions): Promise<Account> {
    const response = await this.client.get<unknown>(`/api/v1/accounts/${id}`, params as Record<string, unknown>, options);
    return unwrap<Account>(response, "account");
  }

  /** Update an account. */
  async update(id: string, params: AccountUpdateParams, options?: RequestOptions): Promise<Account> {
    const response = await this.client.patch<unknown>(`/api/v1/accounts/${id}`, params, options);
    return unwrap<Account>(response, "account");
  }

  /** Delete an account. Only succeeds if the account has no transactions. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/accounts/${id}`, options);
  }
}
