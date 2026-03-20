import type { HttpClient } from "../client.js";
import type { Organization, OrganizationUpdateParams, RequestOptions } from "../types.js";

export class OrganizationResource {
  constructor(private readonly client: HttpClient) {}

  /** Get the current organization details. */
  async get(options?: RequestOptions): Promise<Organization> {
    return this.client.get<Organization>("/api/v1/organization", undefined, options);
  }

  /** Update organization settings. */
  async update(params: OrganizationUpdateParams, options?: RequestOptions): Promise<Organization> {
    return this.client.patch<Organization>("/api/v1/organization", params, options);
  }
}
