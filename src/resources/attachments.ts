import type { HttpClient } from "../client.js";
import type {
  PresignedUrl,
  PresignParams,
  Attachment,
  RequestOptions,
} from "../types.js";
import { unwrap } from "./_utils.js";

export class AttachmentsResource {
  constructor(private readonly client: HttpClient) {}

  /** Get a presigned URL for uploading a file. */
  async presign(params: PresignParams, options?: RequestOptions): Promise<PresignedUrl> {
    return this.client.post<PresignedUrl>("/api/v1/attachments/presign", {
      fileName: params.fileName ?? params.filename,
      fileSize: params.fileSize,
      contentType: params.contentType,
      journalEntryId: params.journalEntryId ?? null,
    }, options);
  }

  /** Download an attachment by ID. */
  async get(id: string, options?: RequestOptions): Promise<Attachment> {
    const response = await this.client.get<Record<string, unknown>>(`/api/v1/attachments/${id}`, undefined, options);
    const attachment = unwrap<Record<string, unknown>>(response, "attachment");
    return {
      ...attachment,
      url: typeof response.downloadUrl === "string" ? response.downloadUrl : "",
    } as Attachment;
  }

  /** Delete an attachment. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/attachments/${id}`, options);
  }
}
