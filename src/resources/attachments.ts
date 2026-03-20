import type { HttpClient } from "../client.js";
import type {
  PresignedUrl,
  PresignParams,
  Attachment,
  RequestOptions,
} from "../types.js";

export class AttachmentsResource {
  constructor(private readonly client: HttpClient) {}

  /** Get a presigned URL for uploading a file. */
  async presign(params: PresignParams, options?: RequestOptions): Promise<PresignedUrl> {
    return this.client.post<PresignedUrl>("/api/v1/attachments/presign", params, options);
  }

  /** Download an attachment by ID. */
  async get(id: string, options?: RequestOptions): Promise<Attachment> {
    return this.client.get<Attachment>(`/api/v1/attachments/${id}`, undefined, options);
  }

  /** Delete an attachment. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/attachments/${id}`, options);
  }
}
