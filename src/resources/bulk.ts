import type { HttpClient } from "../client.js";
import type {
  BulkImportResult,
  ImportJob,
  PaginationParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class BulkResource {
  constructor(private readonly client: HttpClient) {}

  // ─── Invoices ─────────────────────────────────────────────────────────────

  /** Bulk import invoices from CSV/spreadsheet data. */
  async importInvoices(data: Record<string, unknown>[], options?: RequestOptions): Promise<BulkImportResult> {
    return this.client.post<BulkImportResult>("/api/v1/bulk/invoices/import", { data }, options);
  }

  /** Bulk mark invoices as paid. */
  async markInvoicesPaid(ids: string[], options?: RequestOptions): Promise<{ updated: number }> {
    return this.client.post("/api/v1/bulk/invoices/mark-paid", { ids }, options);
  }

  /** Bulk send invoices. */
  async sendInvoices(ids: string[], options?: RequestOptions): Promise<{ sent: number }> {
    return this.client.post("/api/v1/bulk/invoices/send", { ids }, options);
  }

  // ─── Bills ────────────────────────────────────────────────────────────────

  /** Bulk import bills. */
  async importBills(data: Record<string, unknown>[], options?: RequestOptions): Promise<BulkImportResult> {
    return this.client.post<BulkImportResult>("/api/v1/bulk/bills/import", { data }, options);
  }

  // ─── Contacts ─────────────────────────────────────────────────────────────

  /** Bulk import contacts. */
  async importContacts(data: Record<string, unknown>[], options?: RequestOptions): Promise<BulkImportResult> {
    return this.client.post<BulkImportResult>("/api/v1/bulk/contacts/import", { data }, options);
  }

  /** Bulk tag contacts. */
  async tagContacts(ids: string[], tags: string[], options?: RequestOptions): Promise<{ updated: number }> {
    return this.client.post("/api/v1/bulk/contacts/tag", { ids, tags }, options);
  }

  /** Bulk delete contacts. */
  async deleteContacts(ids: string[], options?: RequestOptions): Promise<{ deleted: number }> {
    return this.client.post("/api/v1/bulk/contacts/delete", { ids }, options);
  }

  // ─── Entries ──────────────────────────────────────────────────────────────

  /** Bulk import journal entries. */
  async importEntries(data: Record<string, unknown>[], options?: RequestOptions): Promise<BulkImportResult> {
    return this.client.post<BulkImportResult>("/api/v1/bulk/entries/import", { data }, options);
  }

  // ─── Accounts ─────────────────────────────────────────────────────────────

  /** Bulk import chart of accounts. */
  async importAccounts(data: Record<string, unknown>[], options?: RequestOptions): Promise<BulkImportResult> {
    return this.client.post<BulkImportResult>("/api/v1/bulk/accounts/import", { data }, options);
  }

  // ─── Products ─────────────────────────────────────────────────────────────

  /** Bulk import products. */
  async importProducts(data: Record<string, unknown>[], options?: RequestOptions): Promise<BulkImportResult> {
    return this.client.post<BulkImportResult>("/api/v1/bulk/products/import", { data }, options);
  }

  // ─── Inventory ────────────────────────────────────────────────────────────

  /** Bulk adjust inventory quantities. */
  async adjustInventory(adjustments: Array<{ itemId: string; quantity: number; reason: string }>, options?: RequestOptions): Promise<{ adjusted: number }> {
    return this.client.post("/api/v1/bulk/inventory/adjust", { adjustments }, options);
  }

  // ─── Import Jobs ──────────────────────────────────────────────────────────

  /** Get the status of import jobs. */
  async importJobs(params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<ImportJob>> {
    return this.client.get<PaginatedResponse<ImportJob>>("/api/v1/bulk/import-jobs", params as Record<string, unknown>, options);
  }
}
