import type { HttpClient } from "../client.js";
import type {
  Webhook,
  WebhookCreateParams,
  WebhookUpdateParams,
  WebhookDelivery,
  WebhookDeliveryListParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class WebhooksResource {
  constructor(private readonly client: HttpClient) {}

  /** List webhooks. */
  async list(options?: RequestOptions): Promise<Webhook[]> {
    return this.client.get<Webhook[]>("/api/v1/webhooks", undefined, options);
  }

  /** Create a new webhook. */
  async create(params: WebhookCreateParams, options?: RequestOptions): Promise<Webhook> {
    return this.client.post<Webhook>("/api/v1/webhooks", params, options);
  }

  /** Get a webhook by ID. */
  async get(id: string, options?: RequestOptions): Promise<Webhook> {
    return this.client.get<Webhook>(`/api/v1/webhooks/${id}`, undefined, options);
  }

  /** Update a webhook. */
  async update(id: string, params: WebhookUpdateParams, options?: RequestOptions): Promise<Webhook> {
    return this.client.patch<Webhook>(`/api/v1/webhooks/${id}`, params, options);
  }

  /** Delete a webhook. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/webhooks/${id}`, options);
  }

  /** Send a test event to a webhook. */
  async test(id: string, options?: RequestOptions): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/api/v1/webhooks/${id}/test`, undefined, options);
  }

  /** Get delivery logs for a webhook. */
  async deliveries(id: string, params?: WebhookDeliveryListParams, options?: RequestOptions): Promise<PaginatedResponse<WebhookDelivery>> {
    return this.client.get<PaginatedResponse<WebhookDelivery>>(`/api/v1/webhooks/${id}/deliveries`, params as Record<string, unknown>, options);
  }
}
