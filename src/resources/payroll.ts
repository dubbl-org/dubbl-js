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
    return this.client.post<Employee>("/api/v1/payroll/employees", params, options);
  }

  /** Get an employee by ID. */
  async get(id: string, options?: RequestOptions): Promise<Employee> {
    return this.client.get<Employee>(`/api/v1/payroll/employees/${id}`, undefined, options);
  }

  /** Update an employee. */
  async update(id: string, params: EmployeeUpdateParams, options?: RequestOptions): Promise<Employee> {
    return this.client.patch<Employee>(`/api/v1/payroll/employees/${id}`, params, options);
  }

  /** Delete an employee. */
  async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/payroll/employees/${id}`, options);
  }

  /** Get payslips for an employee. */
  async payslips(id: string, params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<Payslip>> {
    return this.client.get<PaginatedResponse<Payslip>>(`/api/v1/payroll/employees/${id}/payslips`, params as Record<string, unknown>, options);
  }

  /** Get an employee's work schedule. */
  async getSchedule(id: string, options?: RequestOptions): Promise<WorkSchedule[]> {
    return this.client.get<WorkSchedule[]>(`/api/v1/payroll/employees/${id}/schedule`, undefined, options);
  }

  /** Create or update an employee's work schedule. */
  async setSchedule(id: string, params: WorkScheduleCreateParams, options?: RequestOptions): Promise<WorkSchedule> {
    return this.client.post<WorkSchedule>(`/api/v1/payroll/employees/${id}/schedule`, params, options);
  }

  /** Get deductions for an employee. */
  async getDeductions(id: string, options?: RequestOptions): Promise<Deduction[]> {
    return this.client.get<Deduction[]>(`/api/v1/payroll/employees/${id}/deductions`, undefined, options);
  }

  /** Add a deduction to an employee. */
  async addDeduction(id: string, params: DeductionCreateParams, options?: RequestOptions): Promise<Deduction> {
    return this.client.post<Deduction>(`/api/v1/payroll/employees/${id}/deductions`, params, options);
  }

  /** Get leave balances for an employee. */
  async leaveBalances(id: string, options?: RequestOptions): Promise<LeaveBalance[]> {
    return this.client.get<LeaveBalance[]>(`/api/v1/payroll/employees/${id}/leave-balances`, undefined, options);
  }

  /** Get tax configuration for an employee. */
  async getTaxConfig(id: string, options?: RequestOptions): Promise<TaxConfig> {
    return this.client.get<TaxConfig>(`/api/v1/payroll/employees/${id}/tax-config`, undefined, options);
  }

  /** Update tax configuration for an employee. */
  async setTaxConfig(id: string, params: TaxConfig, options?: RequestOptions): Promise<TaxConfig> {
    return this.client.put<TaxConfig>(`/api/v1/payroll/employees/${id}/tax-config`, params, options);
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
    return this.client.post<PayrollRun>("/api/v1/payroll/runs", params, options);
  }

  /** Generate payslips for a payroll run. */
  async generatePayslips(id: string, options?: RequestOptions): Promise<Payslip[]> {
    return this.client.post<Payslip[]>(`/api/v1/payroll/runs/${id}/generate-payslips`, undefined, options);
  }

  /** Submit a payroll run for approval. */
  async submitForApproval(id: string, options?: RequestOptions): Promise<PayrollRun> {
    return this.client.post<PayrollRun>(`/api/v1/payroll/runs/${id}/submit-for-approval`, undefined, options);
  }

  /** Approve a payroll run. */
  async approve(id: string, options?: RequestOptions): Promise<PayrollRun> {
    return this.client.post<PayrollRun>(`/api/v1/payroll/runs/${id}/approve`, undefined, options);
  }

  /** Process an approved payroll run. */
  async process(id: string, options?: RequestOptions): Promise<PayrollRun> {
    return this.client.post<PayrollRun>(`/api/v1/payroll/runs/${id}/process`, undefined, options);
  }

  /** Reject a payroll run. */
  async reject(id: string, options?: RequestOptions): Promise<PayrollRun> {
    return this.client.post<PayrollRun>(`/api/v1/payroll/runs/${id}/reject`, undefined, options);
  }

  /** Get bonuses for a payroll run. */
  async getBonuses(id: string, options?: RequestOptions): Promise<Bonus[]> {
    return this.client.get<Bonus[]>(`/api/v1/payroll/runs/${id}/bonuses`, undefined, options);
  }

  /** Add a bonus to a payroll run. */
  async addBonus(id: string, params: BonusCreateParams, options?: RequestOptions): Promise<Bonus> {
    return this.client.post<Bonus>(`/api/v1/payroll/runs/${id}/bonuses`, params, options);
  }
}

class PayrollLeaveResource {
  constructor(private readonly client: HttpClient) {}

  /** Create a leave request. */
  async createRequest(params: LeaveRequestCreateParams, options?: RequestOptions): Promise<LeaveRequest> {
    return this.client.post<LeaveRequest>("/api/v1/payroll/leave/requests", params, options);
  }

  /** Get a leave request by ID. */
  async getRequest(id: string, options?: RequestOptions): Promise<LeaveRequest> {
    return this.client.get<LeaveRequest>(`/api/v1/payroll/leave/requests/${id}`, undefined, options);
  }

  /** Approve a leave request. */
  async approveRequest(id: string, options?: RequestOptions): Promise<LeaveRequest> {
    return this.client.post<LeaveRequest>(`/api/v1/payroll/leave/requests/${id}/approve`, undefined, options);
  }

  /** Reject a leave request. */
  async rejectRequest(id: string, options?: RequestOptions): Promise<LeaveRequest> {
    return this.client.post<LeaveRequest>(`/api/v1/payroll/leave/requests/${id}/reject`, undefined, options);
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
    return this.client.post<Timesheet>("/api/v1/payroll/timesheets", params, options);
  }

  /** Submit a timesheet for approval. */
  async submit(id: string, options?: RequestOptions): Promise<Timesheet> {
    return this.client.post<Timesheet>(`/api/v1/payroll/timesheets/${id}/submit`, undefined, options);
  }

  /** Approve a timesheet. */
  async approve(id: string, options?: RequestOptions): Promise<Timesheet> {
    return this.client.post<Timesheet>(`/api/v1/payroll/timesheets/${id}/approve`, undefined, options);
  }

  /** Reject a timesheet. */
  async reject(id: string, options?: RequestOptions): Promise<Timesheet> {
    return this.client.post<Timesheet>(`/api/v1/payroll/timesheets/${id}/reject`, undefined, options);
  }
}
