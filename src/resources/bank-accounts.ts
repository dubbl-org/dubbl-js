import type { HttpClient } from "../client.js";
import type {
  BankAccount,
  BankAccountCreateParams,
  BankAccountUpdateParams,
  BankAccountListParams,
  BankTransaction,
  BankTransactionListParams,
  BankTransactionImportParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class BankAccountsResource {
  constructor(private readonly client: HttpClient) {}

  /** List bank accounts. */
  async list(params?: BankAccountListParams, options?: RequestOptions): Promise<PaginatedResponse<BankAccount>> {
    return this.client.get<PaginatedResponse<BankAccount>>("/api/v1/bank-accounts", params as Record<string, unknown>, options);
  }

  /** Create a new bank account. */
  async create(params: BankAccountCreateParams, options?: RequestOptions): Promise<BankAccount> {
    return this.client.post<BankAccount>("/api/v1/bank-accounts", params, options);
  }

  /** Get a bank account by ID. */
  async get(id: string, options?: RequestOptions): Promise<BankAccount> {
    return this.client.get<BankAccount>(`/api/v1/bank-accounts/${id}`, undefined, options);
  }

  /** Update a bank account. */
  async update(id: string, params: BankAccountUpdateParams, options?: RequestOptions): Promise<BankAccount> {
    return this.client.patch<BankAccount>(`/api/v1/bank-accounts/${id}`, params, options);
  }

  /** Delete a bank account. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/bank-accounts/${id}`, options);
  }

  /** List transactions for a bank account. */
  async transactions(id: string, params?: BankTransactionListParams, options?: RequestOptions): Promise<PaginatedResponse<BankTransaction>> {
    return this.client.get<PaginatedResponse<BankTransaction>>(`/api/v1/bank-accounts/${id}/transactions`, params as Record<string, unknown>, options);
  }

  /** Import transactions from a file (CSV, OFX, QIF). */
  async importTransactions(id: string, params: BankTransactionImportParams, options?: RequestOptions): Promise<{ imported: number; duplicates: number }> {
    return this.client.post(`/api/v1/bank-accounts/${id}/transactions/import`, params, options);
  }

  /** Find duplicate transactions. */
  async duplicates(id: string, options?: RequestOptions): Promise<BankTransaction[]> {
    return this.client.get<BankTransaction[]>(`/api/v1/bank-accounts/${id}/duplicates`, undefined, options);
  }

  /** Get reconciliation history. */
  async reconciliations(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    return this.client.get<Record<string, unknown>[]>(`/api/v1/bank-accounts/${id}/reconciliations`, undefined, options);
  }

  /** Validate the current balance. */
  async validateBalance(id: string, options?: RequestOptions): Promise<{ valid: boolean; expected: number; actual: number }> {
    return this.client.post(`/api/v1/bank-accounts/${id}/validate-balance`, undefined, options);
  }
}
