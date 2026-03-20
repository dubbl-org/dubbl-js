import type { HttpClient } from "../client.js";
import type {
  PeriodLock,
  PeriodLockParams,
  RequestOptions,
} from "../types.js";

export class PeriodLockResource {
  constructor(private readonly client: HttpClient) {}

  /** Lock a fiscal period. Prevents changes to entries within the locked range. */
  async lock(params: PeriodLockParams, options?: RequestOptions): Promise<PeriodLock> {
    return this.client.post<PeriodLock>("/api/v1/period-lock", params, options);
  }
}
