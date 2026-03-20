import type { HttpClient } from "../client.js";
import type {
  Notification,
  NotificationListParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class NotificationsResource {
  constructor(private readonly client: HttpClient) {}

  /** List notifications. */
  async list(params?: NotificationListParams, options?: RequestOptions): Promise<PaginatedResponse<Notification>> {
    return this.client.get<PaginatedResponse<Notification>>("/api/v1/notifications", params as Record<string, unknown>, options);
  }

  /** Mark a notification as read. */
  async markRead(id: string, options?: RequestOptions): Promise<void> {
    await this.client.post(`/api/v1/notifications/${id}/read`, undefined, options);
  }
}
