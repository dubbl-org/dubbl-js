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

export class AccountsResource {
  constructor(private readonly client: HttpClient) {}

  /** List all accounts in the chart of accounts. */
  async list(params?: AccountListParams, options?: RequestOptions): Promise<PaginatedResponse<Account>> {
    return this.client.get<PaginatedResponse<Account>>("/api/v1/accounts", params as Record<string, unknown>, options);
  }

  /** Create a new account. */
  async create(params: AccountCreateParams, options?: RequestOptions): Promise<Account> {
    return this.client.post<Account>("/api/v1/accounts", params, options);
  }

  /** Get an account by ID, including transaction ledger and running balance. */
  async get(id: string, params?: AccountLedgerParams, options?: RequestOptions): Promise<Account> {
    return this.client.get<Account>(`/api/v1/accounts/${id}`, params as Record<string, unknown>, options);
  }

  /** Update an account. */
  async update(id: string, params: AccountUpdateParams, options?: RequestOptions): Promise<Account> {
    return this.client.patch<Account>(`/api/v1/accounts/${id}`, params, options);
  }

  /** Delete an account. Only succeeds if the account has no transactions. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/accounts/${id}`, options);
  }
}
