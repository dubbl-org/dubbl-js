import type { HttpClient } from "../client.js";
import type {
  BillingInfo,
  CheckoutSession,
  BillingPortal,
  RequestOptions,
} from "../types.js";

export class BillingResource {
  constructor(private readonly client: HttpClient) {}

  /** Get current billing information. */
  async get(options?: RequestOptions): Promise<BillingInfo> {
    return this.client.get<BillingInfo>("/api/v1/billing", undefined, options);
  }

  /** Create a Stripe checkout session for upgrading. */
  async createCheckout(params?: { plan?: string }, options?: RequestOptions): Promise<CheckoutSession> {
    return this.client.post<CheckoutSession>("/api/v1/billing/checkout", params, options);
  }

  /** Create a billing portal link for managing subscription. */
  async createPortal(options?: RequestOptions): Promise<BillingPortal> {
    return this.client.post<BillingPortal>("/api/v1/billing/portal", undefined, options);
  }
}
