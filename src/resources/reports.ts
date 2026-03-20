import type { HttpClient } from "../client.js";
import type {
  ReportParams,
  SavedReport,
  SavedReportCreateParams,
  CustomReportParams,
  PaginatedResponse,
  PaginationParams,
  RequestOptions,
} from "../types.js";

export class ReportsResource {
  constructor(private readonly client: HttpClient) {}

  // ─── Standard Reports ─────────────────────────────────────────────────────

  /** Generate a trial balance report. */
  async trialBalance(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/trial-balance", params as Record<string, unknown>, options);
  }

  /** Generate a balance sheet report. */
  async balanceSheet(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/balance-sheet", params as Record<string, unknown>, options);
  }

  /** Generate an income statement report. */
  async incomeStatement(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/income-statement", params as Record<string, unknown>, options);
  }

  /** Generate a profit and loss report. */
  async profitAndLoss(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/profit-and-loss", params as Record<string, unknown>, options);
  }

  /** Generate a cash flow statement. */
  async cashFlow(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/cash-flow", params as Record<string, unknown>, options);
  }

  /** Generate a general ledger report. */
  async generalLedger(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/general-ledger", params as Record<string, unknown>, options);
  }

  /** Generate an aged receivables report. */
  async agedReceivables(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/aged-receivables", params as Record<string, unknown>, options);
  }

  /** Generate an aged payables report. */
  async agedPayables(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/aged-payables", params as Record<string, unknown>, options);
  }

  /** Generate an account transactions report. */
  async accountTransactions(params?: ReportParams & { accountId?: string }, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/account-transactions", params as Record<string, unknown>, options);
  }

  /** Generate a budget vs actual report. */
  async budgetVsActual(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/budget-vs-actual", params as Record<string, unknown>, options);
  }

  /** Generate a tax summary report. */
  async taxSummary(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/tax-summary", params as Record<string, unknown>, options);
  }

  /** Generate a sales tax report. */
  async salesTax(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/sales-tax", params as Record<string, unknown>, options);
  }

  /** Generate a VAT return report. */
  async vatReturn(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/vat-return", params as Record<string, unknown>, options);
  }

  /** Generate a BAS (Business Activity Statement) report for Australia. */
  async bas(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/bas", params as Record<string, unknown>, options);
  }

  /** Generate a Schedule C report for US tax filing. */
  async scheduleC(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/schedule-c", params as Record<string, unknown>, options);
  }

  /** Generate financial ratios. */
  async financialRatios(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/financial-ratios", params as Record<string, unknown>, options);
  }

  /** Generate a cash flow forecast. */
  async cashFlowForecast(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/cash-flow-forecast", params as Record<string, unknown>, options);
  }

  /** Run duplicate detection analysis. */
  async duplicateDetection(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/duplicate-detection", params as Record<string, unknown>, options);
  }

  /** Generate expense analytics. */
  async expenseAnalytics(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/expense-analytics", params as Record<string, unknown>, options);
  }

  /** Get the financial calendar. */
  async financialCalendar(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/financial-calendar", params as Record<string, unknown>, options);
  }

  /** Generate an inventory valuation report. */
  async inventoryValuation(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/inventory-valuation", params as Record<string, unknown>, options);
  }

  /** Generate a monthly trends report. */
  async monthlyTrends(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/monthly-trends", params as Record<string, unknown>, options);
  }

  /** Generate a payment performance report. */
  async paymentPerformance(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/payment-performance", params as Record<string, unknown>, options);
  }

  /** Generate a P&L comparison report. */
  async pnlComparison(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/pnl-comparison", params as Record<string, unknown>, options);
  }

  /** Generate a profitability report. */
  async profitability(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/profitability", params as Record<string, unknown>, options);
  }

  /** Generate a recurring transactions report. */
  async recurringTransactions(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/recurring-transactions", params as Record<string, unknown>, options);
  }

  /** Generate an unrealized gains/losses report. */
  async unrealizedGainsLosses(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/unrealized-gains-losses", params as Record<string, unknown>, options);
  }

  /** Generate a vendor spend analysis. */
  async vendorSpend(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/vendor-spend", params as Record<string, unknown>, options);
  }

  /** Generate a bank cash flow report. */
  async bankCashFlow(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/bank-cash-flow", params as Record<string, unknown>, options);
  }

  /** Generate a bank reconciliation status report. */
  async bankReconciliationStatus(params?: ReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.get("/api/v1/reports/bank-reconciliation-status", params as Record<string, unknown>, options);
  }

  // ─── Custom & Saved Reports ───────────────────────────────────────────────

  /** Execute a custom report. */
  async run(params: CustomReportParams, options?: RequestOptions): Promise<Record<string, unknown>> {
    return this.client.post("/api/v1/reports/run", params, options);
  }

  /** List saved reports. */
  async savedList(params?: PaginationParams, options?: RequestOptions): Promise<PaginatedResponse<SavedReport>> {
    return this.client.get<PaginatedResponse<SavedReport>>("/api/v1/reports/saved", params as Record<string, unknown>, options);
  }

  /** Save a report configuration. */
  async save(params: SavedReportCreateParams, options?: RequestOptions): Promise<SavedReport> {
    return this.client.post<SavedReport>("/api/v1/reports/saved", params, options);
  }

  /** Get a saved report by ID. */
  async savedGet(id: string, options?: RequestOptions): Promise<SavedReport> {
    return this.client.get<SavedReport>(`/api/v1/reports/saved/${id}`, undefined, options);
  }

  /** Delete a saved report. */
  async savedDelete(id: string, options?: RequestOptions): Promise<void> {
    await this.client.delete(`/api/v1/reports/saved/${id}`, options);
  }

  /** Export a saved report. */
  async savedExport(id: string, params?: { format?: "csv" | "pdf" | "xlsx" }, options?: RequestOptions): Promise<Blob> {
    return this.client.get<Blob>(`/api/v1/reports/saved/${id}/export`, params as Record<string, unknown>, options);
  }
}
