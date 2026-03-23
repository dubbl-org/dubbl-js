import type { HttpClient } from "../client.js";
import type {
  Invoice,
  InvoiceCreateParams,
  InvoiceUpdateParams,
  InvoiceListParams,
  InvoiceSendParams,
  InvoicePayParams,
  InvoiceSummary,
  InterestCalculation,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";
import { unwrap, unwrapList } from "./_utils.js";

export class InvoicesResource {
  constructor(private readonly client: HttpClient) {}

  /** List invoices with optional filters. */
  async list(params?: InvoiceListParams, options?: RequestOptions): Promise<PaginatedResponse<Invoice>> {
    return this.client.get<PaginatedResponse<Invoice>>("/api/v1/invoices", params as Record<string, unknown>, options);
  }

  /** Create a new invoice. */
  async create(params: InvoiceCreateParams, options?: RequestOptions): Promise<Invoice> {
    const response = await this.client.post<unknown>("/api/v1/invoices", params, options);
    return unwrap<Invoice>(response, "invoice");
  }

  /** Get an invoice by ID with lines and payments. */
  async get(id: string, options?: RequestOptions): Promise<Invoice> {
    const response = await this.client.get<Record<string, unknown>>(`/api/v1/invoices/${id}`, undefined, options);
    const invoice = unwrap<Invoice>(response, "invoice");
    if (Array.isArray(response.payments)) {
      return {
        ...invoice,
        payments: response.payments,
      } as Invoice;
    }
    return invoice;
  }

  /** Update a draft invoice. */
  async update(id: string, params: InvoiceUpdateParams, options?: RequestOptions): Promise<Invoice> {
    const response = await this.client.patch<unknown>(`/api/v1/invoices/${id}`, params, options);
    return unwrap<Invoice>(response, "invoice");
  }

  /** Delete an invoice. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/invoices/${id}`, options);
  }

  /** Send an invoice and create the journal entry. */
  async send(id: string, params?: InvoiceSendParams, options?: RequestOptions): Promise<Invoice> {
    const response = await this.client.post<unknown>(`/api/v1/invoices/${id}/send`, params, options);
    return unwrap<Invoice>(response, "invoice");
  }

  /** Record a payment against an invoice. */
  async pay(id: string, params: InvoicePayParams, options?: RequestOptions): Promise<Invoice> {
    const response = await this.client.post<unknown>(`/api/v1/invoices/${id}/pay`, params, options);
    return unwrap<Invoice>(response, "invoice");
  }

  /** Void an invoice. */
  async void(id: string, options?: RequestOptions): Promise<Invoice> {
    const response = await this.client.post<unknown>(`/api/v1/invoices/${id}/void`, undefined, options);
    return unwrap<Invoice>(response, "invoice");
  }

  /** Add interest charges to an overdue invoice. */
  async chargeInterest(id: string, options?: RequestOptions): Promise<Invoice> {
    const response = await this.client.post<unknown>(`/api/v1/invoices/${id}/charge-interest`, undefined, options);
    return unwrap<Invoice>(response, "invoice");
  }

  /** Calculate interest on outstanding invoices. */
  async calculateInterest(params?: { contactId?: string }, options?: RequestOptions): Promise<InterestCalculation[]> {
    const response = await this.client.post<unknown>("/api/v1/invoices/calculate-interest", params, options);
    return unwrapList<InterestCalculation>(response, "data");
  }

  /** Get an invoice summary with totals by status. */
  async summary(options?: RequestOptions): Promise<InvoiceSummary> {
    return this.client.get<InvoiceSummary>("/api/v1/invoices/summary", undefined, options);
  }

  /** Generate a payment link for an invoice. */
  async createPaymentLink(id: string, options?: RequestOptions): Promise<{ url: string }> {
    return this.client.post<{ url: string }>(`/api/v1/invoices/${id}/payment-link`, undefined, options);
  }

  /** Download invoice as PDF. */
  async pdf(id: string, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>(`/api/v1/invoices/${id}/pdf`, undefined, options);
  }

  /** Run compliance checks on an invoice. */
  async compliance(id: string, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>(`/api/v1/invoices/${id}/compliance`, undefined, options);
  }

  /** Request a signature on an invoice. */
  async requestSignature(id: string, options?: RequestOptions): Promise<Record<string, unknown>> {
    const response = await this.client.post<unknown>(`/api/v1/invoices/${id}/signature`, undefined, options);
    return unwrap<Record<string, unknown>>(response, "signature");
  }

  /** Resend a signature request. */
  async resendSignature(id: string, options?: RequestOptions): Promise<void> {
    await this.client.post(`/api/v1/invoices/${id}/signature/resend`, undefined, options);
  }

  /** Take a snapshot of the current invoice state. */
  async snapshot(id: string, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>(`/api/v1/invoices/${id}/snapshot`, undefined, options);
  }

  /** Get the invoice in UBL format. */
  async ubl(id: string, options?: RequestOptions): Promise<string> {
    return this.client.get<string>(`/api/v1/invoices/${id}/ubl`, undefined, options);
  }
}
