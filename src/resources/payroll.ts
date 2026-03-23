import type { HttpClient } from "../client.js";
import type {
  Employee,
  EmployeeCreateParams,
  EmployeeUpdateParams,
  EmployeeListParams,
  PayrollRun,
  PayrollRunCreateParams,
  Payslip,
  Bonus,
  BonusCreateParams,
  Deduction,
  DeductionCreateParams,
  LeaveRequest,
  LeaveRequestCreateParams,
  LeaveBalance,
  WorkSchedule,
  WorkScheduleCreateParams,
  TaxConfig,
  Timesheet,
  TimesheetCreateParams,
  TimesheetListParams,
  PaginatedResponse,
  PaginationParams,
  RequestOptions,
} from "../types.js";
import { unwrap, unwrapList, unwrapPaginated } from "./_utils.js";

export class PayrollResource {
  readonly employees: PayrollEmployeesResource;
  readonly runs: PayrollRunsResource;
  readonly leave: PayrollLeaveResource;
  readonly timesheets: PayrollTimesheetsResource;

  constructor(client: HttpClient) {
    this.employees = new PayrollEmployeesResource(client);
    this.runs = new PayrollRunsResource(client);
    this.leave = new PayrollLeaveResource(client);
    this.timesheets = new PayrollTimesheetsResource(client);
  }
}

class PayrollEmployeesResource {
  constructor(private readonly client: HttpClient) {}

  /** List employees. */
  async list(params?: EmployeeListParams, options?: RequestOptions): Promise<PaginatedResponse<Employee>> {
    return this.client.get<PaginatedResponse<Employee>>("/api/v1/payroll/employees", params as Record<string, unknown>, options);
  }

  /** Create a new employee. */
  async create(params: EmployeeCreateParams, options?: RequestOptions): Promise<Employee> {
    const response = await this.client.post<unknown>("/api/v1/payroll/employees", params, options);
    return unwrap<Employee>(response, "employee");
  }

  /** Get an employee by ID. */
  async get(id: string, options?: RequestOptions): Promise<Employee> {
    const response = await this.client.get<unknown>(`/api/v1/payroll/employees/${id}`, undefined, options);
    return unwrap<Employee>(response, "employee");
  }

  /** Update an employee. */
  async update(id: string, params: EmployeeUpdateParams, options?: RequestOptions): Promise<Employee> {
    const response = await this.client.patch<unknown>(`/api/v1/payroll/employees/${id}`, params, options);
    return unwrap<Employee>(response, "employee");
  }

  /** Delete an employee. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/payroll/employees/${id}`, options);
  }

  /** Get payslips for an employee. */
  async payslips(id: string, params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<Payslip>> {
    const response = await this.client.get<unknown>(`/api/v1/payroll/employees/${id}/payslips`, params as Record<string, unknown>, options);
    return unwrapPaginated<Payslip>(response, "data");
  }

  /** Get an employee's work schedule. */
  async getSchedule(id: string, options?: RequestOptions): Promise<WorkSchedule[]> {
    const response = await this.client.get<unknown>(`/api/v1/payroll/employees/${id}/schedule`, undefined, options);
    return unwrapList<WorkSchedule>(response, "data");
  }

  /** Create or update an employee's work schedule. */
  async setSchedule(id: string, params: WorkScheduleCreateParams, options?: RequestOptions): Promise<WorkSchedule> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/employees/${id}/schedule`, params, options);
    return unwrap<WorkSchedule>(response, "schedule");
  }

  /** Get deductions for an employee. */
  async getDeductions(id: string, options?: RequestOptions): Promise<Deduction[]> {
    const response = await this.client.get<unknown>(`/api/v1/payroll/employees/${id}/deductions`, undefined, options);
    return unwrapList<Deduction>(response, "data");
  }

  /** Add a deduction to an employee. */
  async addDeduction(id: string, params: DeductionCreateParams, options?: RequestOptions): Promise<Deduction> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/employees/${id}/deductions`, params, options);
    return unwrap<Deduction>(response, "deduction");
  }

  /** Get leave balances for an employee. */
  async leaveBalances(id: string, options?: RequestOptions): Promise<LeaveBalance[]> {
    const response = await this.client.get<unknown>(`/api/v1/payroll/employees/${id}/leave-balances`, undefined, options);
    return unwrapList<LeaveBalance>(response, "data");
  }

  /** Get tax configuration for an employee. */
  async getTaxConfig(id: string, options?: RequestOptions): Promise<TaxConfig> {
    const response = await this.client.get<unknown>(`/api/v1/payroll/employees/${id}/tax-config`, undefined, options);
    return unwrap<TaxConfig>(response, "taxConfig");
  }

  /** Update tax configuration for an employee. */
  async setTaxConfig(id: string, params: TaxConfig, options?: RequestOptions): Promise<TaxConfig> {
    const response = await this.client.put<unknown>(`/api/v1/payroll/employees/${id}/tax-config`, params, options);
    return unwrap<TaxConfig>(response, "taxConfig");
  }
}

class PayrollRunsResource {
  constructor(private readonly client: HttpClient) {}

  /** List payroll runs. */
  async list(params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<PayrollRun>> {
    return this.client.get<PaginatedResponse<PayrollRun>>("/api/v1/payroll/runs", params as Record<string, unknown>, options);
  }

  /** Create a new payroll run. */
  async create(params: PayrollRunCreateParams, options?: RequestOptions): Promise<PayrollRun> {
    const response = await this.client.post<unknown>("/api/v1/payroll/runs", params, options);
    return unwrap<PayrollRun>(response, "run");
  }

  /** Generate payslips for a payroll run. */
  async generatePayslips(id: string, options?: RequestOptions): Promise<number> {
    const response = await this.client.post<Record<string, unknown>>(`/api/v1/payroll/runs/${id}/generate-payslips`, undefined, options);
    return typeof response.count === "number" ? response.count : 0;
  }

  /** Submit a payroll run for approval. */
  async submitForApproval(id: string, options?: RequestOptions): Promise<PayrollRun> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/runs/${id}/submit-for-approval`, undefined, options);
    return unwrap<PayrollRun>(response, "run");
  }

  /** Approve a payroll run. */
  async approve(id: string, options?: RequestOptions): Promise<PayrollRun> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/runs/${id}/approve`, undefined, options);
    return unwrap<PayrollRun>(response, "run");
  }

  /** Process an approved payroll run. */
  async process(id: string, options?: RequestOptions): Promise<PayrollRun> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/runs/${id}/process`, undefined, options);
    return unwrap<PayrollRun>(response, "run");
  }

  /** Reject a payroll run. */
  async reject(id: string, options?: RequestOptions): Promise<PayrollRun> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/runs/${id}/reject`, undefined, options);
    return unwrap<PayrollRun>(response, "run");
  }

  /** Get bonuses for a payroll run. */
  async getBonuses(id: string, options?: RequestOptions): Promise<Bonus[]> {
    const response = await this.client.get<unknown>(`/api/v1/payroll/runs/${id}/bonuses`, undefined, options);
    return unwrapList<Bonus>(response, "data");
  }

  /** Add a bonus to a payroll run. */
  async addBonus(id: string, params: BonusCreateParams, options?: RequestOptions): Promise<Bonus> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/runs/${id}/bonuses`, params, options);
    return unwrap<Bonus>(response, "bonus");
  }
}

class PayrollLeaveResource {
  constructor(private readonly client: HttpClient) {}

  /** Create a leave request. */
  async createRequest(params: LeaveRequestCreateParams, options?: RequestOptions): Promise<LeaveRequest> {
    const response = await this.client.post<unknown>("/api/v1/payroll/leave/requests", params, options);
    return unwrap<LeaveRequest>(response, "request");
  }

  /** Get a leave request by ID. */
  async getRequest(id: string, options?: RequestOptions): Promise<LeaveRequest> {
    const response = await this.client.get<unknown>(`/api/v1/payroll/leave/requests/${id}`, undefined, options);
    return unwrap<LeaveRequest>(response, "request");
  }

  /** Approve a leave request. */
  async approveRequest(id: string, options?: RequestOptions): Promise<LeaveRequest> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/leave/requests/${id}/approve`, undefined, options);
    return unwrap<LeaveRequest>(response, "request");
  }

  /** Reject a leave request. */
  async rejectRequest(id: string, options?: RequestOptions): Promise<LeaveRequest> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/leave/requests/${id}/reject`, undefined, options);
    return unwrap<LeaveRequest>(response, "request");
  }
}

class PayrollTimesheetsResource {
  constructor(private readonly client: HttpClient) {}

  /** List timesheets. */
  async list(params?: TimesheetListParams, options?: RequestOptions): Promise<PaginatedResponse<Timesheet>> {
    return this.client.get<PaginatedResponse<Timesheet>>("/api/v1/payroll/timesheets", params as Record<string, unknown>, options);
  }

  /** Create a timesheet. */
  async create(params: TimesheetCreateParams, options?: RequestOptions): Promise<Timesheet> {
    const response = await this.client.post<unknown>("/api/v1/payroll/timesheets", params, options);
    return unwrap<Timesheet>(response, "timesheet");
  }

  /** Submit a timesheet for approval. */
  async submit(id: string, options?: RequestOptions): Promise<Timesheet> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/timesheets/${id}/submit`, undefined, options);
    return unwrap<Timesheet>(response, "timesheet");
  }

  /** Approve a timesheet. */
  async approve(id: string, options?: RequestOptions): Promise<Timesheet> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/timesheets/${id}/approve`, undefined, options);
    return unwrap<Timesheet>(response, "timesheet");
  }

  /** Reject a timesheet. */
  async reject(id: string, options?: RequestOptions): Promise<Timesheet> {
    const response = await this.client.post<unknown>(`/api/v1/payroll/timesheets/${id}/reject`, undefined, options);
    return unwrap<Timesheet>(response, "timesheet");
  }
}
