import type { HttpClient } from "../client.js";
import type {
  Project,
  ProjectCreateParams,
  ProjectUpdateParams,
  ProjectListParams,
  ProjectTask,
  ProjectTaskCreateParams,
  ChecklistItem,
  TimeEntry,
  TimeEntryCreateParams,
  PaginatedResponse,
  RequestOptions,
} from "../types.js";

export class ProjectsResource {
  constructor(private readonly client: HttpClient) {}

  /** List projects. */
  async list(params?: ProjectListParams, options?: RequestOptions): Promise<PaginatedResponse<Project>> {
    return this.client.get<PaginatedResponse<Project>>("/api/v1/projects", params as Record<string, unknown>, options);
  }

  /** Create a new project. */
  async create(params: ProjectCreateParams, options?: RequestOptions): Promise<Project> {
    return this.client.post<Project>("/api/v1/projects", params, options);
  }

  /** Get a project by ID. */
  async get(id: string, options?: RequestOptions): Promise<Project> {
    return this.client.get<Project>(`/api/v1/projects/${id}`, undefined, options);
  }

  /** Update a project. */
  async update(id: string, params: ProjectUpdateParams, options?: RequestOptions): Promise<Project> {
    return this.client.patch<Project>(`/api/v1/projects/${id}`, params, options);
  }

  /** Delete a project. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/projects/${id}`, options);
  }

  // ─── Tasks ──────────────────────────────────────────────────────────────

  /** Create a task within a project. */
  async createTask(projectId: string, params: ProjectTaskCreateParams, options?: RequestOptions): Promise<ProjectTask> {
    return this.client.post<ProjectTask>(`/api/v1/projects/${projectId}/tasks`, params, options);
  }

  /** Get a task within a project. */
  async getTask(projectId: string, taskId: string, options?: RequestOptions): Promise<ProjectTask> {
    return this.client.get<ProjectTask>(`/api/v1/projects/${projectId}/tasks/${taskId}`, undefined, options);
  }

  /** Add a checklist to a task. */
  async addChecklist(projectId: string, taskId: string, items: ChecklistItem[], options?: RequestOptions): Promise<void> {
    await this.client.post(`/api/v1/projects/${projectId}/tasks/${taskId}/checklist`, items, options);
  }

  // ─── Time Entries ───────────────────────────────────────────────────────

  /** Log time against a project. */
  async logTime(projectId: string, params: TimeEntryCreateParams, options?: RequestOptions): Promise<TimeEntry> {
    return this.client.post<TimeEntry>(`/api/v1/projects/${projectId}/time-entries`, params, options);
  }
}
