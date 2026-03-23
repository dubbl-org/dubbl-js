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
import { unwrap } from "./_utils.js";

type ApiProject = Project & {
  currency?: string;
};

type ApiProjectTask = ProjectTask & {
  title?: string;
  priority?: string;
  teamId?: string | null;
  startDate?: string | null;
  estimatedMinutes?: number | null;
  labels?: string[];
  sortOrder?: number;
  completedAt?: string | null;
};

type ApiTimeEntry = TimeEntry & {
  minutes?: number;
  hourlyRate?: number;
};

function normalizeProject(project: ApiProject): Project {
  return {
    ...project,
    currencyCode: project.currencyCode ?? project.currency ?? "USD",
  };
}

function normalizeTask(task: ApiProjectTask): ProjectTask {
  return {
    ...task,
    name: task.name ?? task.title ?? "",
  };
}

function normalizeTimeEntry(timeEntry: ApiTimeEntry): TimeEntry {
  const minutes = timeEntry.minutes;
  return {
    ...timeEntry,
    hours: timeEntry.hours ?? (typeof minutes === "number" ? minutes / 60 : 0),
  };
}

export class ProjectsResource {
  constructor(private readonly client: HttpClient) {}

  /** List projects. */
  async list(params?: ProjectListParams, options?: RequestOptions): Promise<PaginatedResponse<Project>> {
    const response = await this.client.get<PaginatedResponse<ApiProject>>(
      "/api/v1/projects",
      params as Record<string, unknown>,
      options
    );
    return {
      ...response,
      data: response.data.map(normalizeProject),
    };
  }

  /** Create a new project. */
  async create(params: ProjectCreateParams, options?: RequestOptions): Promise<Project> {
    const response = await this.client.post<unknown>("/api/v1/projects", {
      ...params,
      currency: params.currency ?? params.currencyCode,
    }, options);
    return normalizeProject(unwrap<ApiProject>(response, "project"));
  }

  /** Get a project by ID. */
  async get(id: string, options?: RequestOptions): Promise<Project> {
    const response = await this.client.get<unknown>(`/api/v1/projects/${id}`, undefined, options);
    return normalizeProject(unwrap<ApiProject>(response, "project"));
  }

  /** Update a project. */
  async update(id: string, params: ProjectUpdateParams, options?: RequestOptions): Promise<Project> {
    const response = await this.client.patch<unknown>(`/api/v1/projects/${id}`, {
      ...params,
      currency: params.currency ?? params.currencyCode,
    }, options);
    return normalizeProject(unwrap<ApiProject>(response, "project"));
  }

  /** Delete a project. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/projects/${id}`, options);
  }

  // ─── Tasks ──────────────────────────────────────────────────────────────

  /** Create a task within a project. */
  async createTask(projectId: string, params: ProjectTaskCreateParams, options?: RequestOptions): Promise<ProjectTask> {
    const response = await this.client.post<unknown>(`/api/v1/projects/${projectId}/tasks`, {
      ...params,
      title: params.title ?? params.name,
    }, options);
    return normalizeTask(unwrap<ApiProjectTask>(response, "task"));
  }

  /** Get a task within a project. */
  async getTask(projectId: string, taskId: string, options?: RequestOptions): Promise<ProjectTask> {
    const response = await this.client.get<unknown>(`/api/v1/projects/${projectId}/tasks/${taskId}`, undefined, options);
    return normalizeTask(unwrap<ApiProjectTask>(response, "task"));
  }

  /** Add a checklist to a task. */
  async addChecklist(projectId: string, taskId: string, items: ChecklistItem[], options?: RequestOptions): Promise<void> {
    for (const item of items) {
      await this.client.post(`/api/v1/projects/${projectId}/tasks/${taskId}/checklist`, {
        title: item.text,
      }, options);
    }
  }

  // ─── Time Entries ───────────────────────────────────────────────────────

  /** Log time against a project. */
  async logTime(projectId: string, params: TimeEntryCreateParams, options?: RequestOptions): Promise<TimeEntry> {
    const minutes = params.minutes ?? Math.round(params.hours * 60);
    const response = await this.client.post<unknown>(`/api/v1/projects/${projectId}/time-entries`, {
      ...params,
      minutes,
    }, options);
    return normalizeTimeEntry(unwrap<ApiTimeEntry>(response, "timeEntry"));
  }
}
