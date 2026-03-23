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
import { unwrap, unwrapList, unwrapPaginated } from "./_utils.js";

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
    const response = await this.client.get<unknown>("/api/v1/crm/deals", params as Record<string, unknown>, options);
    return unwrapPaginated<Deal>(response, "deals");
  }

  /** Create a new deal. */
  async create(params: DealCreateParams, options?: RequestOptions): Promise<Deal> {
    const response = await this.client.post<unknown>("/api/v1/crm/deals", params, options);
    return unwrap<Deal>(response, "deal");
  }

  /** Get a deal by ID. */
  async get(id: string, options?: RequestOptions): Promise<Deal> {
    const response = await this.client.get<unknown>(`/api/v1/crm/deals/${id}`, undefined, options);
    return unwrap<Deal>(response, "deal");
  }

  /** Update a deal. */
  async update(id: string, params: DealUpdateParams, options?: RequestOptions): Promise<Deal> {
    const response = await this.client.patch<unknown>(`/api/v1/crm/deals/${id}`, params, options);
    return unwrap<Deal>(response, "deal");
  }

  /** Update the stage of a deal. */
  async setStage(id: string, stage: string, options?: RequestOptions): Promise<Deal> {
    const response = await this.client.patch<unknown>(`/api/v1/crm/deals/${id}/stage`, { stageId: stage }, options);
    return unwrap<Deal>(response, "deal");
  }

  /** Mark a deal as won. */
  async markWon(id: string, options?: RequestOptions): Promise<Deal> {
    const response = await this.client.post<unknown>(`/api/v1/crm/deals/${id}/won`, undefined, options);
    return unwrap<Deal>(response, "deal");
  }

  /** Mark a deal as lost. */
  async markLost(id: string, params?: { reason?: string }, options?: RequestOptions): Promise<Deal> {
    const response = await this.client.post<unknown>(`/api/v1/crm/deals/${id}/lost`, params, options);
    return unwrap<Deal>(response, "deal");
  }
}

class CrmPipelinesResource {
  constructor(private readonly client: HttpClient) {}

  /** List all pipelines. */
  async list(options?: RequestOptions): Promise<Pipeline[]> {
    const response = await this.client.get<unknown>("/api/v1/crm/pipelines", undefined, options);
    return unwrapList<Pipeline>(response, "pipelines");
  }
}
