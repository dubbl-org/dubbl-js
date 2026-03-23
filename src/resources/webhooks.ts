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
import { unwrap, unwrapList } from "./_utils.js";

export class WebhooksResource {
  constructor(private readonly client: HttpClient) {}

  /** List webhooks. */
  async list(options?: RequestOptions): Promise<Webhook[]> {
    const response = await this.client.get<unknown>("/api/v1/webhooks", undefined, options);
    return unwrapList<Webhook>(response, "data");
  }

  /** Create a new webhook. */
  async create(params: WebhookCreateParams, options?: RequestOptions): Promise<Webhook> {
    const response = await this.client.post<unknown>("/api/v1/webhooks", params, options);
    return unwrap<Webhook>(response, "webhook");
  }

  /** Get a webhook by ID. */
  async get(id: string, options?: RequestOptions): Promise<Webhook> {
    const response = await this.client.get<unknown>(`/api/v1/webhooks/${id}`, undefined, options);
    return unwrap<Webhook>(response, "webhook");
  }

  /** Update a webhook. */
  async update(id: string, params: WebhookUpdateParams, options?: RequestOptions): Promise<Webhook> {
    const response = await this.client.patch<unknown>(`/api/v1/webhooks/${id}`, params, options);
    return unwrap<Webhook>(response, "webhook");
  }

  /** Delete a webhook. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/webhooks/${id}`, options);
  }

  /** Send a test event to a webhook. */
  async test(id: string, options?: RequestOptions): Promise<WebhookDelivery> {
    const response = await this.client.post<unknown>(`/api/v1/webhooks/${id}/test`, undefined, options);
    return unwrap<WebhookDelivery>(response, "delivery");
  }

  /** Get delivery logs for a webhook. */
  async deliveries(id: string, params?: WebhookDeliveryListParams, options?: RequestOptions): Promise<PaginatedResponse<WebhookDelivery>> {
    return this.client.get<PaginatedResponse<WebhookDelivery>>(`/api/v1/webhooks/${id}/deliveries`, params as Record<string, unknown>, options);
  }
}
