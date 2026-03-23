import type { HttpClient } from "../client.js";
import type {
  PeriodLock,
  PeriodLockParams,
  RequestOptions,
} from "../types.js";
import { unwrap } from "./_utils.js";

export class PeriodLockResource {
  constructor(private readonly client: HttpClient) {}

  /** Get the current fiscal period lock. */
  async get(options?: RequestOptions): Promise<PeriodLock | null> {
    const response = await this.client.get<unknown>("/api/v1/period-lock", undefined, options);
    return unwrap<PeriodLock | null>(response, "periodLock");
  }

  /** Lock a fiscal period. Prevents changes to entries within the locked range. */
  async lock(params: PeriodLockParams, options?: RequestOptions): Promise<PeriodLock> {
    const response = await this.client.put<unknown>("/api/v1/period-lock", {
      lockDate: params.lockDate ?? params.lockedUntil,
      reason: params.reason ?? null,
    }, options);
    return unwrap<PeriodLock>(response, "periodLock");
  }
}
