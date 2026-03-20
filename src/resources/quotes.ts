import type { HttpClient } from "../client.js";
import type {
  Quote,
  QuoteCreateParams,
  QuoteUpdateParams,
  QuoteListParams,
  QuoteSendParams,
  Invoice,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class QuotesResource {
  constructor(private readonly client: HttpClient) {}

  /** List quotes with optional filters. */
  async list(params?: QuoteListParams, options?: RequestOptions): Promise<PaginatedResponse<Quote>> {
    return this.client.get<PaginatedResponse<Quote>>("/api/v1/quotes", params as Record<string, unknown>, options);
  }

  /** Create a new quote. */
  async create(params: QuoteCreateParams, options?: RequestOptions): Promise<Quote> {
    return this.client.post<Quote>("/api/v1/quotes", params, options);
  }

  /** Get a quote by ID. */
  async get(id: string, options?: RequestOptions): Promise<Quote> {
    return this.client.get<Quote>(`/api/v1/quotes/${id}`, undefined, options);
  }

  /** Update a quote. */
  async update(id: string, params: QuoteUpdateParams, options?: RequestOptions): Promise<Quote> {
    return this.client.patch<Quote>(`/api/v1/quotes/${id}`, params, options);
  }

  /** Delete a quote. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/quotes/${id}`, options);
  }

  /** Send a quote to the contact. */
  async send(id: string, params?: QuoteSendParams, options?: RequestOptions): Promise<Quote> {
    return this.client.post<Quote>(`/api/v1/quotes/${id}/send`, params, options);
  }

  /** Accept a quote. */
  async accept(id: string, options?: RequestOptions): Promise<Quote> {
    return this.client.post<Quote>(`/api/v1/quotes/${id}/accept`, undefined, options);
  }

  /** Decline a quote. */
  async decline(id: string, options?: RequestOptions): Promise<Quote> {
    return this.client.post<Quote>(`/api/v1/quotes/${id}/decline`, undefined, options);
  }

  /** Convert a quote to an invoice. */
  async convert(id: string, options?: RequestOptions): Promise<Invoice> {
    return this.client.post<Invoice>(`/api/v1/quotes/${id}/convert`, undefined, options);
  }
}
