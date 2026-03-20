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

export class MembersResource {
  constructor(private readonly client: HttpClient) {}

  /** List all members in the organization. */
  async list(params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<Member>> {
    return this.client.get<PaginatedResponse<Member>>("/api/v1/members", params as Record<string, unknown>, options);
  }

  /** Invite a new member to the organization. */
  async invite(params: MemberInviteParams, options?: RequestOptions): Promise<Member> {
    return this.client.post<Member>("/api/v1/members", params, options);
  }

  /** Get a member by ID. */
  async get(id: string, options?: RequestOptions): Promise<Member> {
    return this.client.get<Member>(`/api/v1/members/${id}`, undefined, options);
  }

  /** Update a member's role. */
  async update(id: string, params: MemberUpdateParams, options?: RequestOptions): Promise<Member> {
    return this.client.patch<Member>(`/api/v1/members/${id}`, params, options);
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
