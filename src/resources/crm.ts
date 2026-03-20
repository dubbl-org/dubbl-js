import type { HttpClient } from "../client.js";
import type {
  Deal,
  DealCreateParams,
  DealUpdateParams,
  DealListParams,
  Pipeline,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class CrmResource {
  readonly deals: CrmDealsResource;
  readonly pipelines: CrmPipelinesResource;

  constructor(client: HttpClient) {
    this.deals = new CrmDealsResource(client);
    this.pipelines = new CrmPipelinesResource(client);
  }
}

class CrmDealsResource {
  constructor(private readonly client: HttpClient) {}

  /** List deals. */
  async list(params?: DealListParams, options?: RequestOptions): Promise<PaginatedResponse<Deal>> {
    return this.client.get<PaginatedResponse<Deal>>("/api/v1/crm/deals", params as Record<string, unknown>, options);
  }

  /** Create a new deal. */
  async create(params: DealCreateParams, options?: RequestOptions): Promise<Deal> {
    return this.client.post<Deal>("/api/v1/crm/deals", params, options);
  }

  /** Get a deal by ID. */
  async get(id: string, options?: RequestOptions): Promise<Deal> {
    return this.client.get<Deal>(`/api/v1/crm/deals/${id}`, undefined, options);
  }

  /** Update a deal. */
  async update(id: string, params: DealUpdateParams, options?: RequestOptions): Promise<Deal> {
    return this.client.patch<Deal>(`/api/v1/crm/deals/${id}`, params, options);
  }

  /** Update the stage of a deal. */
  async setStage(id: string, stage: string, options?: RequestOptions): Promise<Deal> {
    return this.client.post<Deal>(`/api/v1/crm/deals/${id}/stage`, { stage }, options);
  }

  /** Mark a deal as won. */
  async markWon(id: string, options?: RequestOptions): Promise<Deal> {
    return this.client.post<Deal>(`/api/v1/crm/deals/${id}/won`, undefined, options);
  }

  /** Mark a deal as lost. */
  async markLost(id: string, params?: { reason?: string }, options?: RequestOptions): Promise<Deal> {
    return this.client.post<Deal>(`/api/v1/crm/deals/${id}/lost`, params, options);
  }
}

class CrmPipelinesResource {
  constructor(private readonly client: HttpClient) {}

  /** List all pipelines. */
  async list(options?: RequestOptions): Promise<Pipeline[]> {
    return this.client.get<Pipeline[]>("/api/v1/crm/pipelines", undefined, options);
  }
}
