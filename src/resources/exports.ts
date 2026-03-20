import type { HttpClient } from "../client.js";
import type { ExportParams, RequestOptions } from "../types.js";

export class ExportsResource {
  constructor(private readonly client: HttpClient) {}

  /** Export chart of accounts. */
  async accounts(params?: ExportParams, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>("/api/v1/export/accounts", params as Record<string, unknown>, options);
  }

  /** Export journal entries. */
  async entries(params?: ExportParams, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>("/api/v1/export/entries", params as Record<string, unknown>, options);
  }

  /** Export invoices. */
  async invoices(params?: ExportParams, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>("/api/v1/export/invoices", params as Record<string, unknown>, options);
  }

  /** Export bills. */
  async bills(params?: ExportParams, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>("/api/v1/export/bills", params as Record<string, unknown>, options);
  }

  /** Export bank transactions. */
  async bankTransactions(params?: ExportParams, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>("/api/v1/export/bank-transactions", params as Record<string, unknown>, options);
  }

  /** Export contacts. */
  async contacts(params?: ExportParams, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>("/api/v1/export/contacts", params as Record<string, unknown>, options);
  }

  /** Export products. */
  async products(params?: ExportParams, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>("/api/v1/export/products", params as Record<string, unknown>, options);
  }

  /** Export all organization data. */
  async all(params?: ExportParams, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>("/api/v1/export/all", params as Record<string, unknown>, options);
  }
}
