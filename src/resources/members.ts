import type { HttpClient } from "../client.js";
import type {
  Member,
  MemberInviteParams,
  MemberUpdateParams,
  MemberCapacity,
  PaginatedResponse,
  PaginationParams,
  RequestOptions,
} from "../types.js";
import { unwrap, unwrapPaginated } from "./_utils.js";

export class MembersResource {
  constructor(private readonly client: HttpClient) {}

  /** List all members in the organization. */
  async list(params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<Member>> {
    const response = await this.client.get<unknown>("/api/v1/members", params as Record<string, unknown>, options);
    return unwrapPaginated<Member>(response, "members");
  }

  /** Invite a new member to the organization. */
  async invite(params: MemberInviteParams, options?: RequestOptions): Promise<Member> {
    const response = await this.client.post<unknown>("/api/v1/members", params, options);
    return unwrap<Member>(response, "member");
  }

  /** Get a member by ID. */
  async get(id: string, options?: RequestOptions): Promise<Member> {
    const response = await this.client.get<unknown>(`/api/v1/members/${id}`, undefined, options);
    return unwrap<Member>(response, "member");
  }

  /** Update a member's role. */
  async update(id: string, params: MemberUpdateParams, options?: RequestOptions): Promise<Member> {
    const response = await this.client.patch<unknown>(`/api/v1/members/${id}`, params, options);
    return unwrap<Member>(response, "member");
  }

  /** Remove a member from the organization. */
  async remove(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/members/${id}`, options);
  }

  /** Get member capacity information. */
  async capacity(options?: RequestOptions): Promise<MemberCapacity> {
    return this.client.get<MemberCapacity>("/api/v1/members/capacity", undefined, options);
  }
}
