import type { HttpClient } from "../client.js";
import type {
  Document,
  DocumentCreateParams,
  DocumentListParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class DocumentsResource {
  constructor(private readonly client: HttpClient) {}

  /** List documents. */
  async list(params?: DocumentListParams, options?: RequestOptions): Promise<PaginatedResponse<Document>> {
    return this.client.get<PaginatedResponse<Document>>("/api/v1/documents", params as Record<string, unknown>, options);
  }

  /** Create a document reference. */
  async create(params: DocumentCreateParams, options?: RequestOptions): Promise<Document> {
    return this.client.post<Document>("/api/v1/documents", params, options);
  }

  /** Download a document. */
  async download(id: string, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>(`/api/v1/documents/${id}/download`, undefined, options);
  }
}
