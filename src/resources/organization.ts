import type { HttpClient } from "../client.js";
import type { Organization, OrganizationUpdateParams, RequestOptions } from "../types.js";
import { unwrap } from "./_utils.js";

export class OrganizationResource {
  constructor(private readonly client: HttpClient) {}

  /** Get the current organization details. */
  async get(options?: RequestOptions): Promise<Organization> {
    const response = await this.client.get<unknown>("/api/v1/organization", undefined, options);
    return unwrap<Organization>(response, "organization");
  }

  /** Update organization settings. */
  async update(params: OrganizationUpdateParams, options?: RequestOptions): Promise<Organization> {
    const response = await this.client.patch<unknown>("/api/v1/organization", params, options);
    return unwrap<Organization>(response, "organization");
  }
}
