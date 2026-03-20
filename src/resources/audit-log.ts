import type { HttpClient } from "../client.js";
import type {
  AuditLogEntry,
  AuditLogListParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class AuditLogResource {
  constructor(private readonly client: HttpClient) {}

  /** List audit log entries. */
  async list(params?: AuditLogListParams, options?: RequestOptions): Promise<PaginatedResponse<AuditLogEntry>> {
    return this.client.get<PaginatedResponse<AuditLogEntry>>("/api/v1/audit-log", params as Record<string, unknown>, options);
  }
}
