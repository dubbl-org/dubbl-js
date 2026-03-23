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
import { unwrap, unwrapList, unwrapPaginated } from "./_utils.js";

export class ContactsResource {
  constructor(private readonly client: HttpClient) {}

  /** List contacts with optional filters. */
  async list(params?: ContactListParams, options?: RequestOptions): Promise<PaginatedResponse<Contact>> {
    return this.client.get<PaginatedResponse<Contact>>("/api/v1/contacts", params as Record<string, unknown>, options);
  }

  /** Create a new contact. */
  async create(params: ContactCreateParams, options?: RequestOptions): Promise<Contact> {
    const response = await this.client.post<unknown>("/api/v1/contacts", params, options);
    return unwrap<Contact>(response, "contact");
  }

  /** Get a contact by ID. */
  async get(id: string, options?: RequestOptions): Promise<Contact> {
    const response = await this.client.get<unknown>(`/api/v1/contacts/${id}`, undefined, options);
    return unwrap<Contact>(response, "contact");
  }

  /** Update a contact. */
  async update(id: string, params: ContactUpdateParams, options?: RequestOptions): Promise<Contact> {
    const response = await this.client.patch<unknown>(`/api/v1/contacts/${id}`, params, options);
    return unwrap<Contact>(response, "contact");
  }

  /** Delete a contact. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/contacts/${id}`, options);
  }

  /** Get activity history for a contact. */
  async activity(id: string, params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<Record<string, unknown>>> {
    const response = await this.client.get<unknown>(`/api/v1/contacts/${id}/activity`, params as Record<string, unknown>, options);
    return unwrapPaginated<Record<string, unknown>>(response, "activity");
  }

  /** Get people (contact persons) associated with a contact. */
  async people(id: string, options?: RequestOptions): Promise<Record<string, unknown>[]> {
    const response = await this.client.get<unknown>(`/api/v1/contacts/${id}/people`, undefined, options);
    return unwrapList<Record<string, unknown>>(response, "data", "people");
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
    const response = await this.client.get<unknown>(`/api/v1/contacts/${id}/files`, undefined, options);
    return unwrapList<Attachment>(response, "data");
  }
}
