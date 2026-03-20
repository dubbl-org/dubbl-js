import type { HttpClient } from "../client.js";
import type {
  Contact,
  ContactCreateParams,
  ContactUpdateParams,
  ContactListParams,
  ContactStatementParams,
  ContactStatementEmailParams,
  PaginatedResponse,
  PaginationParams,
  Attachment,
  RequestOptions,
} from "../types.js";

export class ContactsResource {
  constructor(private readonly client: HttpClient) {}

  /** List contacts with optional filters. */
  async list(params?: ContactListParams, options?: RequestOptions): Promise<PaginatedResponse<Contact>> {
    return this.client.get<PaginatedResponse<Contact>>("/api/v1/contacts", params as Record<string, unknown>, options);
  }

  /** Create a new contact. */
  async create(params: ContactCreateParams, options?: RequestOptions): Promise<Contact> {
    return this.client.post<Contact>("/api/v1/contacts", params, options);
  }

  /** Get a contact by ID. */
  async get(id: string, options?: RequestOptions): Promise<Contact> {
    return this.client.get<Contact>(`/api/v1/contacts/${id}`, undefined, options);
  }

  /** Update a contact. */
  async update(id: string, params: ContactUpdateParams, options?: RequestOptions): Promise<Contact> {
    return this.client.patch<Contact>(`/api/v1/contacts/${id}`, params, options);
  }

  /** Delete a contact. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/contacts/${id}`, options);
  }

  /** Get activity history for a contact. */
  async activity(id: string, params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<Record<string, unknown>>> {
    return this.client.get(`/api/v1/contacts/${id}/activity`, params as Record<string, unknown>, options);
  }

  /** Get people (contact persons) associated with a contact. */
  async people(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    return this.client.get<Record<string, unknown>[]>(`/api/v1/contacts/${id}/people`, undefined, options);
  }

  /** Get a statement for a contact. */
  async statement(id: string, params?: ContactStatementParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get(`/api/v1/contacts/${id}/statement`, params as Record<string, unknown>, options);
  }

  /** Email a statement to a contact. */
  async emailStatement(id: string, params: ContactStatementEmailParams, options?: RequestOptions): Promise<void> {
    await this.client.post(`/api/v1/contacts/${id}/statement/email`, params, options);
  }

  /** Download a statement PDF for a contact. */
  async statementPdf(id: string, params?: ContactStatementParams, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>(`/api/v1/contacts/${id}/statement/pdf`, params as Record<string, unknown>, options);
  }

  /** Get files attached to a contact. */
  async files(id: string, options?: RequestOptions): Promise<Attachment[]> {
    return this.client.get<Attachment[]>(`/api/v1/contacts/${id}/files`, undefined, options);
  }
}
