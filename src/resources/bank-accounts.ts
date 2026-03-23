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
import { unwrap, unwrapList, unwrapPaginated } from "./_utils.js";

export class BankAccountsResource {
  constructor(private readonly client: HttpClient) {}

  /** List bank accounts. */
  async list(params?: BankAccountListParams, options?: RequestOptions): Promise<PaginatedResponse<BankAccount>> {
    const response = await this.client.get<unknown>("/api/v1/bank-accounts", params as Record<string, unknown>, options);
    return unwrapPaginated<BankAccount>(response, "bankAccounts");
  }

  /** Create a new bank account. */
  async create(params: BankAccountCreateParams, options?: RequestOptions): Promise<BankAccount> {
    const response = await this.client.post<unknown>("/api/v1/bank-accounts", params, options);
    return unwrap<BankAccount>(response, "bankAccount");
  }

  /** Get a bank account by ID. */
  async get(id: string, options?: RequestOptions): Promise<BankAccount> {
    const response = await this.client.get<unknown>(`/api/v1/bank-accounts/${id}`, undefined, options);
    return unwrap<BankAccount>(response, "bankAccount");
  }

  /** Update a bank account. */
  async update(id: string, params: BankAccountUpdateParams, options?: RequestOptions): Promise<BankAccount> {
    const response = await this.client.patch<unknown>(`/api/v1/bank-accounts/${id}`, params, options);
    return unwrap<BankAccount>(response, "bankAccount");
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
    const response = await this.client.post<Record<string, unknown>>(`/api/v1/bank-accounts/${id}/transactions/import`, params, options);
    const result = unwrap<Record<string, unknown>>(response, "import");
    return {
      imported: typeof result.imported === "number" ? result.imported : 0,
      duplicates:
        typeof result.duplicateCount === "number"
          ? result.duplicateCount
          : typeof result.duplicates === "number"
            ? result.duplicates
            : 0,
    };
  }

  /** Find duplicate transactions. */
  async duplicates(id: string, options?: RequestOptions): Promise<BankTransaction[]> {
    const response = await this.client.get<unknown>(`/api/v1/bank-accounts/${id}/duplicates`, undefined, options);
    return unwrapList<BankTransaction>(response, "duplicateGroups", "data");
  }

  /** Get reconciliation history. */
  async reconciliations(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    const response = await this.client.get<unknown>(`/api/v1/bank-accounts/${id}/reconciliations`, undefined, options);
    return unwrapList<Record<string, unknown>>(response, "data");
  }

  /** Validate the current balance. */
  async validateBalance(id: string, options?: RequestOptions): Promise<{ valid: boolean; expected: number; actual: number }> {
    return this.client.get(`/api/v1/bank-accounts/${id}/validate-balance`, undefined, options);
  }
}
