import type { HttpClient } from "../client.js";
import type {
  Document,
  DocumentDownload,
  DocumentCreateParams,
  DocumentListParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";
import { unwrap } from "./_utils.js";

export class DocumentsResource {
  constructor(private readonly client: HttpClient) {}

  /** List documents. */
  async list(params?: DocumentListParams, options?: RequestOptions): Promise<PaginatedResponse<Document>> {
    return this.client.get<PaginatedResponse<Document>>("/api/v1/documents", params as Record<string, unknown>, options);
  }

  /** Create a document reference. */
  async create(params: DocumentCreateParams, options?: RequestOptions): Promise<Document> {
    const response = await this.client.post<unknown>("/api/v1/documents", params, options);
    return unwrap<Document>(response, "document");
  }

  /** Download a document. */
  async download(id: string, options?: RequestOptions): Promise<DocumentDownload> {
    return this.client.get<DocumentDownload>(`/api/v1/documents/${id}/download`, undefined, options);
  }
}
