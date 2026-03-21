// ─── Client Options ───────────────────────────────────────────────────────────

export interface DubblOptions {
  /** API key in the format `dk_<key>` */
  apiKey: string;
  /** Base URL for the API. Defaults to `https://dubbl.dev` */
  baseUrl?: string;
  /** Organization ID header. Required if user belongs to multiple organizations. */
  organizationId?: string;
  /** Request timeout in milliseconds. Defaults to 30000. */
  timeout?: number;
  /** Maximum number of retries on 5xx or network errors. Defaults to 2. */
  maxRetries?: number;
  /** Custom fetch implementation. Defaults to global fetch. */
  fetch?: typeof globalThis.fetch;
}

// ─── HTTP ─────────────────────────────────────────────────────────────────────

export interface RequestOptions {
  /** Additional headers to include in the request. */
  headers?: Record<string, string>;
  /** AbortSignal for cancelling the request. */
  signal?: AbortSignal;
  /** Override the default timeout for this request. */
  timeout?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─── Sorting ──────────────────────────────────────────────────────────────────

export type SortOrder = "asc" | "desc";

// ─── Organization ─────────────────────────────────────────────────────────────

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  currencyCode: string;
  countryCode: string | null;
  timezone: string | null;
  fiscalYearStart: number | null;
  industry: string | null;
  taxNumber: string | null;
  address: Address | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationUpdateParams {
  name?: string;
  slug?: string;
  logo?: string | null;
  currencyCode?: string;
  countryCode?: string | null;
  timezone?: string | null;
  fiscalYearStart?: number | null;
  industry?: string | null;
  taxNumber?: string | null;
  address?: Address | null;
}

// ─── Members ──────────────────────────────────────────────────────────────────

export type MemberRole = "owner" | "admin" | "member";

export interface Member {
  id: string;
  userId: string;
  organizationId: string;
  role: MemberRole;
  customRoleId: string | null;
  email: string;
  name: string | null;
  image: string | null;
  joinedAt: string;
}

export interface MemberInviteParams {
  email: string;
  role: MemberRole;
  customRoleId?: string | null;
}

export interface MemberUpdateParams {
  role?: MemberRole;
  customRoleId?: string | null;
}

export interface MemberCapacity {
  current: number;
  max: number;
  canInvite: boolean;
}

// ─── Accounts (Chart of Accounts) ────────────────────────────────────────────

export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";

export interface Account {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  subType: string | null;
  parentId: string | null;
  currencyCode: string;
  description: string | null;
  isArchived: boolean;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface AccountCreateParams {
  code: string;
  name: string;
  type: AccountType;
  subType?: string | null;
  parentId?: string | null;
  currencyCode?: string;
  description?: string | null;
}

export interface AccountUpdateParams {
  code?: string;
  name?: string;
  type?: AccountType;
  subType?: string | null;
  parentId?: string | null;
  description?: string | null;
}

export interface AccountListParams extends PaginationParams {
  search?: string;
  type?: AccountType;
  sortBy?: "code" | "name" | "type" | "balance";
  sortOrder?: SortOrder;
}

export interface AccountLedgerParams extends PaginationParams {
  search?: string;
  from?: string;
  to?: string;
  entryType?: "debits" | "credits";
  sortBy?: "date" | "number" | "amount";
  sortOrder?: SortOrder;
}

// ─── Journal Entries ──────────────────────────────────────────────────────────

export type EntryStatus = "draft" | "posted" | "void";

export interface EntryLine {
  id: string;
  accountId: string;
  description: string | null;
  debitAmount: number;
  creditAmount: number;
  currencyCode: string;
  exchangeRate: number;
}

export interface EntryLineCreateParams {
  accountId: string;
  description?: string | null;
  debitAmount: number;
  creditAmount: number;
  currencyCode?: string;
  exchangeRate?: number;
}

export interface Entry {
  id: string;
  number: number;
  date: string;
  description: string;
  reference: string | null;
  status: EntryStatus;
  fiscalYearId: string | null;
  lines: EntryLine[];
  createdAt: string;
  updatedAt: string;
}

export interface EntryCreateParams {
  date: string;
  description: string;
  reference?: string | null;
  fiscalYearId?: string | null;
  lines: EntryLineCreateParams[];
}

export interface EntryListParams extends PaginationParams {
  search?: string;
  status?: EntryStatus;
  from?: string;
  to?: string;
  sortBy?: "date" | "number" | "created";
  sortOrder?: SortOrder;
}

// ─── Invoices ─────────────────────────────────────────────────────────────────

export type InvoiceStatus = "draft" | "sent" | "partial" | "paid" | "overdue" | "void";

export interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  accountId: string | null;
  taxRateId: string | null;
  discountPercent: number;
  amount: number;
}

export interface InvoiceLineCreateParams {
  description: string;
  quantity: number;
  unitPrice: number;
  accountId?: string | null;
  taxRateId?: string | null;
  discountPercent?: number;
}

export interface Invoice {
  id: string;
  number: string;
  contactId: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string | null;
  reference: string | null;
  notes: string | null;
  currencyCode: string;
  subtotal: number;
  taxTotal: number;
  total: number;
  amountDue: number;
  amountPaid: number;
  lines: InvoiceLine[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceCreateParams {
  contactId: string;
  issueDate: string;
  dueDate?: string | null;
  reference?: string | null;
  notes?: string | null;
  currencyCode?: string;
  lines: InvoiceLineCreateParams[];
}

export interface InvoiceUpdateParams {
  contactId?: string;
  issueDate?: string;
  dueDate?: string | null;
  reference?: string | null;
  notes?: string | null;
  lines?: InvoiceLineCreateParams[];
}

export interface InvoiceListParams extends PaginationParams {
  status?: InvoiceStatus;
  contactId?: string;
  from?: string;
  to?: string;
  sortBy?: "date" | "due" | "total" | "amountDue" | "number" | "created";
  sortOrder?: SortOrder;
}

export interface InvoiceSendParams {
  sendEmail?: boolean;
  recipientEmail?: string;
  subject?: string;
  templateProps?: {
    organizationName?: string;
    contactName?: string;
    documentType?: string;
    documentNumber?: string;
    personalMessage?: string;
    amountFormatted?: string;
    dueDateFormatted?: string;
  };
  attachPdf?: boolean;
  includePaymentLink?: boolean;
}

export type PaymentMethod = "bank_transfer" | "cash" | "check" | "card" | "other";

export interface InvoicePayParams {
  amount: number;
  date: string;
  method: PaymentMethod;
  reference?: string | null;
  bankAccountId?: string | null;
}

export interface InvoiceSummary {
  draft: number;
  sent: number;
  partial: number;
  paid: number;
  overdue: number;
  totalOutstanding: number;
}

export interface InterestCalculation {
  invoiceId: string;
  principal: number;
  interestAmount: number;
  daysOverdue: number;
}

// ─── Quotes ───────────────────────────────────────────────────────────────────

export type QuoteStatus = "draft" | "sent" | "accepted" | "declined" | "expired" | "converted";

export interface Quote {
  id: string;
  number: string;
  contactId: string;
  status: QuoteStatus;
  issueDate: string;
  expiryDate: string | null;
  reference: string | null;
  notes: string | null;
  currencyCode: string;
  subtotal: number;
  taxTotal: number;
  total: number;
  lines: InvoiceLine[];
  createdAt: string;
  updatedAt: string;
}

export interface QuoteCreateParams {
  contactId: string;
  issueDate: string;
  expiryDate?: string | null;
  reference?: string | null;
  notes?: string | null;
  currencyCode?: string;
  lines: InvoiceLineCreateParams[];
}

export interface QuoteUpdateParams {
  contactId?: string;
  issueDate?: string;
  expiryDate?: string | null;
  reference?: string | null;
  notes?: string | null;
  lines?: InvoiceLineCreateParams[];
}

export interface QuoteListParams extends PaginationParams {
  status?: QuoteStatus;
  contactId?: string;
  from?: string;
  to?: string;
  sortBy?: "date" | "expiry" | "total" | "number" | "created";
  sortOrder?: SortOrder;
}

export interface QuoteSendParams {
  sendEmail?: boolean;
  recipientEmail?: string;
  subject?: string;
  templateProps?: Record<string, string>;
}

// ─── Bills ────────────────────────────────────────────────────────────────────

export type BillStatus = "draft" | "received" | "partial" | "paid" | "overdue" | "void" | "approved" | "rejected";

export interface Bill {
  id: string;
  number: string;
  contactId: string;
  status: BillStatus;
  issueDate: string;
  dueDate: string | null;
  reference: string | null;
  notes: string | null;
  currencyCode: string;
  subtotal: number;
  taxTotal: number;
  total: number;
  amountDue: number;
  amountPaid: number;
  lines: InvoiceLine[];
  createdAt: string;
  updatedAt: string;
}

export interface BillCreateParams {
  contactId: string;
  issueDate: string;
  dueDate?: string | null;
  reference?: string | null;
  notes?: string | null;
  currencyCode?: string;
  lines: InvoiceLineCreateParams[];
}

export interface BillUpdateParams {
  contactId?: string;
  issueDate?: string;
  dueDate?: string | null;
  reference?: string | null;
  notes?: string | null;
  lines?: InvoiceLineCreateParams[];
}

export interface BillListParams extends PaginationParams {
  status?: BillStatus;
  contactId?: string;
  from?: string;
  to?: string;
  sortBy?: "date" | "due" | "total" | "amountDue" | "number" | "created";
  sortOrder?: SortOrder;
}

export interface BillPayParams {
  amount: number;
  date: string;
  method: PaymentMethod;
  reference?: string | null;
  bankAccountId?: string | null;
}

export interface BillCounts {
  draft: number;
  received: number;
  partial: number;
  paid: number;
  overdue: number;
  approved: number;
  rejected: number;
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export type ContactType = "customer" | "supplier" | "both";

export interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  taxNumber: string | null;
  type: ContactType;
  paymentTermsDays: number;
  addresses: {
    billing: Address | null;
    shipping: Address | null;
  };
  notes: string | null;
  currencyCode: string;
  creditLimit: number | null;
  isTaxExempt: boolean;
  defaultRevenueAccountId: string | null;
  defaultExpenseAccountId: string | null;
  defaultTaxRateId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContactCreateParams {
  name: string;
  email?: string | null;
  phone?: string | null;
  taxNumber?: string | null;
  type: ContactType;
  paymentTermsDays?: number;
  addresses?: {
    billing?: Address;
    shipping?: Address;
  };
  notes?: string | null;
  currencyCode?: string;
  creditLimit?: number | null;
  isTaxExempt?: boolean;
  defaultRevenueAccountId?: string | null;
  defaultExpenseAccountId?: string | null;
  defaultTaxRateId?: string | null;
}

export interface ContactUpdateParams {
  name?: string;
  email?: string | null;
  phone?: string | null;
  taxNumber?: string | null;
  type?: ContactType;
  paymentTermsDays?: number;
  addresses?: {
    billing?: Address;
    shipping?: Address;
  };
  notes?: string | null;
  currencyCode?: string;
  creditLimit?: number | null;
  isTaxExempt?: boolean;
  defaultRevenueAccountId?: string | null;
  defaultExpenseAccountId?: string | null;
  defaultTaxRateId?: string | null;
}

export interface ContactListParams extends PaginationParams {
  search?: string;
  type?: ContactType;
  from?: string;
  to?: string;
  sortBy?: "name" | "type" | "terms" | "creditLimit" | "created";
  sortOrder?: SortOrder;
}

export interface ContactStatementParams {
  from?: string;
  to?: string;
}

export interface ContactStatementEmailParams {
  recipientEmail: string;
  subject?: string;
  message?: string;
}

// ─── Tax Rates ────────────────────────────────────────────────────────────────

export interface TaxRate {
  id: string;
  name: string;
  rate: number;
  description: string | null;
  isDefault: boolean;
  isCompound: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaxRateCreateParams {
  name: string;
  rate: number;
  description?: string | null;
  isDefault?: boolean;
  isCompound?: boolean;
}

export interface TaxRateUpdateParams {
  name?: string;
  rate?: number;
  description?: string | null;
  isDefault?: boolean;
  isCompound?: boolean;
}

// ─── Bank Accounts ────────────────────────────────────────────────────────────

export type BankAccountType = "checking" | "savings" | "credit_card" | "cash" | "loan" | "investment" | "other";

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string | null;
  bankName: string | null;
  currencyCode: string;
  countryCode: string | null;
  accountType: BankAccountType;
  color: string;
  chartAccountId: string | null;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccountCreateParams {
  accountName: string;
  accountNumber?: string | null;
  bankName?: string | null;
  currencyCode?: string;
  countryCode?: string | null;
  accountType: BankAccountType;
  color?: string;
  chartAccountId?: string | null;
  balance?: number;
}

export interface BankAccountUpdateParams {
  accountName?: string;
  accountNumber?: string | null;
  bankName?: string | null;
  currencyCode?: string;
  countryCode?: string | null;
  accountType?: BankAccountType;
  color?: string;
  chartAccountId?: string | null;
}

export interface BankAccountListParams extends PaginationParams {
  search?: string;
  accountType?: BankAccountType;
}

export interface BankTransaction {
  id: string;
  bankAccountId: string;
  date: string;
  description: string;
  amount: number;
  balance: number | null;
  reference: string | null;
  category: string | null;
  isReconciled: boolean;
  matchedEntryId: string | null;
  createdAt: string;
}

export interface BankTransactionListParams extends PaginationParams {
  from?: string;
  to?: string;
  search?: string;
  isReconciled?: boolean;
  sortBy?: "date" | "amount";
  sortOrder?: SortOrder;
}

export interface BankTransactionImportParams {
  format: "csv" | "ofx" | "qif";
  data: string;
}

// ─── Fiscal Years ─────────────────────────────────────────────────────────────

export interface FiscalYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isClosed: boolean;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FiscalYearCreateParams {
  name: string;
  startDate: string;
  endDate: string;
}

export interface FiscalYearUpdateParams {
  name?: string;
  startDate?: string;
  endDate?: string;
}

// ─── API Keys ─────────────────────────────────────────────────────────────────

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export interface ApiKeyCreateParams {
  name: string;
  expiresAt?: string | null;
}

export interface ApiKeyCreateResponse extends ApiKey {
  key: string;
}

// ─── Billing ──────────────────────────────────────────────────────────────────

export interface BillingInfo {
  plan: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  trialEnd: string | null;
}

export interface CheckoutSession {
  url: string;
}

export interface BillingPortal {
  url: string;
}

// ─── Reports ──────────────────────────────────────────────────────────────────

export interface ReportParams {
  from?: string;
  to?: string;
  fiscalYearId?: string;
  comparePrevious?: boolean;
  format?: "json" | "csv" | "pdf";
}

export interface SavedReport {
  id: string;
  name: string;
  type: string;
  params: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SavedReportCreateParams {
  name: string;
  type: string;
  params: Record<string, unknown>;
}

export interface CustomReportParams {
  type: string;
  params: Record<string, unknown>;
}

// ─── Payroll ──────────────────────────────────────────────────────────────────

export type EmploymentType = "full_time" | "part_time" | "contractor" | "casual";
export type PayFrequency = "weekly" | "biweekly" | "monthly" | "semimonthly";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  employmentType: EmploymentType;
  payFrequency: PayFrequency;
  baseSalary: number;
  hourlyRate: number | null;
  startDate: string;
  endDate: string | null;
  department: string | null;
  position: string | null;
  taxFileNumber: string | null;
  bankDetails: {
    accountName: string;
    bsb: string;
    accountNumber: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeCreateParams {
  firstName: string;
  lastName: string;
  email: string;
  employmentType: EmploymentType;
  payFrequency: PayFrequency;
  baseSalary: number;
  hourlyRate?: number | null;
  startDate: string;
  endDate?: string | null;
  department?: string | null;
  position?: string | null;
  taxFileNumber?: string | null;
  bankDetails?: {
    accountName: string;
    bsb: string;
    accountNumber: string;
  } | null;
}

export interface EmployeeUpdateParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  employmentType?: EmploymentType;
  payFrequency?: PayFrequency;
  baseSalary?: number;
  hourlyRate?: number | null;
  endDate?: string | null;
  department?: string | null;
  position?: string | null;
}

export interface EmployeeListParams extends PaginationParams {
  search?: string;
  employmentType?: EmploymentType;
  department?: string;
  sortBy?: "name" | "department" | "startDate" | "salary";
  sortOrder?: SortOrder;
}

export type PayrollRunStatus = "draft" | "pending_approval" | "approved" | "processing" | "completed" | "rejected";

export interface PayrollRun {
  id: string;
  periodStart: string;
  periodEnd: string;
  payDate: string;
  status: PayrollRunStatus;
  totalGross: number;
  totalNet: number;
  totalTax: number;
  totalDeductions: number;
  employeeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollRunCreateParams {
  periodStart: string;
  periodEnd: string;
  payDate: string;
}

export interface Payslip {
  id: string;
  payrollRunId: string;
  employeeId: string;
  grossPay: number;
  netPay: number;
  taxWithheld: number;
  deductions: number;
  superannuation: number;
  hoursWorked: number | null;
  createdAt: string;
}

export interface Bonus {
  id: string;
  payrollRunId: string;
  employeeId: string;
  amount: number;
  description: string;
  createdAt: string;
}

export interface BonusCreateParams {
  employeeId: string;
  amount: number;
  description: string;
}

export interface Deduction {
  id: string;
  employeeId: string;
  name: string;
  amount: number;
  isPercentage: boolean;
  isPreTax: boolean;
  createdAt: string;
}

export interface DeductionCreateParams {
  name: string;
  amount: number;
  isPercentage?: boolean;
  isPreTax?: boolean;
}

export type LeaveType = "annual" | "sick" | "personal" | "unpaid" | "other";
export type LeaveRequestStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string | null;
  status: LeaveRequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequestCreateParams {
  employeeId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason?: string | null;
}

export interface LeaveBalance {
  leaveType: LeaveType;
  entitled: number;
  taken: number;
  remaining: number;
}

export interface WorkSchedule {
  id: string;
  employeeId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  breakMinutes: number;
}

export interface WorkScheduleCreateParams {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  breakMinutes?: number;
}

export interface TaxConfig {
  taxTableId: string | null;
  claimsTaxFreeThreshold: boolean;
  hasHelpDebt: boolean;
  hasSfssDebt: boolean;
  superRate: number;
}

export type TimesheetStatus = "draft" | "submitted" | "approved" | "rejected";

export interface Timesheet {
  id: string;
  employeeId: string;
  weekStarting: string;
  status: TimesheetStatus;
  totalHours: number;
  entries: TimesheetEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface TimesheetEntry {
  date: string;
  hours: number;
  description: string | null;
  projectId: string | null;
}

export interface TimesheetCreateParams {
  employeeId: string;
  weekStarting: string;
  entries: TimesheetEntry[];
}

export interface TimesheetListParams extends PaginationParams {
  employeeId?: string;
  status?: TimesheetStatus;
  from?: string;
  to?: string;
}

// ─── Inventory ────────────────────────────────────────────────────────────────

export type InventoryTrackingMethod = "fifo" | "lifo" | "average" | "specific";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  categoryId: string | null;
  unitOfMeasure: string;
  costPrice: number;
  sellPrice: number;
  reorderPoint: number | null;
  reorderQuantity: number | null;
  quantityOnHand: number;
  trackingMethod: InventoryTrackingMethod;
  isSerialized: boolean;
  isLotTracked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItemCreateParams {
  name: string;
  sku: string;
  description?: string | null;
  categoryId?: string | null;
  unitOfMeasure?: string;
  costPrice: number;
  sellPrice: number;
  reorderPoint?: number | null;
  reorderQuantity?: number | null;
  quantityOnHand?: number;
  trackingMethod?: InventoryTrackingMethod;
  isSerialized?: boolean;
  isLotTracked?: boolean;
}

export interface InventoryItemUpdateParams {
  name?: string;
  sku?: string;
  description?: string | null;
  categoryId?: string | null;
  unitOfMeasure?: string;
  costPrice?: number;
  sellPrice?: number;
  reorderPoint?: number | null;
  reorderQuantity?: number | null;
  trackingMethod?: InventoryTrackingMethod;
}

export interface InventoryItemListParams extends PaginationParams {
  search?: string;
  categoryId?: string;
  sortBy?: "name" | "sku" | "quantity" | "cost" | "price";
  sortOrder?: SortOrder;
}

export interface StockAdjustment {
  quantity: number;
  reason: string;
  date?: string;
  warehouseId?: string;
  unitCost?: number;
}

export interface InventoryCategory {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
}

export interface InventoryCategoryCreateParams {
  name: string;
  parentId?: string | null;
}

export interface BillOfMaterials {
  id: string;
  productId: string;
  name: string;
  components: BomComponent[];
  createdAt: string;
  updatedAt: string;
}

export interface BomComponent {
  itemId: string;
  quantity: number;
  unitCost: number;
}

export interface BomCreateParams {
  productId: string;
  name: string;
  components: BomComponent[];
}

export interface InventoryTransfer {
  id: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  status: "pending" | "completed" | "cancelled";
  items: TransferItem[];
  createdAt: string;
}

export interface TransferItem {
  itemId: string;
  quantity: number;
}

export interface TransferCreateParams {
  fromWarehouseId: string;
  toWarehouseId: string;
  items: TransferItem[];
}

export interface AssemblyOrder {
  id: string;
  bomId: string;
  quantity: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface AssemblyOrderCreateParams {
  bomId: string;
  quantity: number;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectStatus = "active" | "completed" | "archived" | "on_hold";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  contactId: string | null;
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
  budget: number | null;
  currencyCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreateParams {
  name: string;
  description?: string | null;
  contactId?: string | null;
  status?: ProjectStatus;
  startDate?: string | null;
  endDate?: string | null;
  budget?: number | null;
  currencyCode?: string;
}

export interface ProjectUpdateParams {
  name?: string;
  description?: string | null;
  contactId?: string | null;
  status?: ProjectStatus;
  startDate?: string | null;
  endDate?: string | null;
  budget?: number | null;
}

export interface ProjectListParams extends PaginationParams {
  status?: ProjectStatus;
  contactId?: string;
  search?: string;
  sortBy?: "name" | "status" | "startDate" | "budget" | "created";
  sortOrder?: SortOrder;
}

export interface ProjectTask {
  id: string;
  projectId: string;
  name: string;
  description: string | null;
  status: "todo" | "in_progress" | "done";
  assigneeId: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTaskCreateParams {
  name: string;
  description?: string | null;
  status?: "todo" | "in_progress" | "done";
  assigneeId?: string | null;
  dueDate?: string | null;
}

export interface ChecklistItem {
  text: string;
  isCompleted?: boolean;
}

export interface TimeEntry {
  id: string;
  projectId: string;
  taskId: string | null;
  userId: string;
  date: string;
  hours: number;
  description: string | null;
  isBillable: boolean;
  createdAt: string;
}

export interface TimeEntryCreateParams {
  taskId?: string | null;
  date: string;
  hours: number;
  description?: string | null;
  isBillable?: boolean;
}

// ─── CRM ──────────────────────────────────────────────────────────────────────

export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";

export interface Deal {
  id: string;
  name: string;
  contactId: string;
  pipelineId: string;
  stage: DealStage;
  value: number;
  currencyCode: string;
  probability: number;
  expectedCloseDate: string | null;
  notes: string | null;
  wonAt: string | null;
  lostAt: string | null;
  lostReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DealCreateParams {
  name: string;
  contactId: string;
  pipelineId: string;
  stage?: DealStage;
  value: number;
  currencyCode?: string;
  probability?: number;
  expectedCloseDate?: string | null;
  notes?: string | null;
}

export interface DealUpdateParams {
  name?: string;
  contactId?: string;
  value?: number;
  probability?: number;
  expectedCloseDate?: string | null;
  notes?: string | null;
}

export interface DealListParams extends PaginationParams {
  pipelineId?: string;
  stage?: DealStage;
  contactId?: string;
  sortBy?: "name" | "value" | "probability" | "expectedCloseDate" | "created";
  sortOrder?: SortOrder;
}

export interface Pipeline {
  id: string;
  name: string;
  stages: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Webhooks ─────────────────────────────────────────────────────────────────

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookCreateParams {
  url: string;
  events: string[];
  secret?: string;
}

export interface WebhookUpdateParams {
  url?: string;
  events?: string[];
  isActive?: boolean;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: string;
  statusCode: number | null;
  requestBody: string;
  responseBody: string | null;
  deliveredAt: string;
  success: boolean;
}

export interface WebhookDeliveryListParams extends PaginationParams {
  event?: string;
  success?: boolean;
}

// ─── Bulk Operations ──────────────────────────────────────────────────────────

export interface BulkImportResult {
  imported: number;
  skipped: number;
  errors: Array<{ row: number; message: string }>;
  jobId: string;
}

export interface ImportJob {
  id: string;
  type: string;
  status: "pending" | "processing" | "completed" | "failed";
  totalRows: number;
  processedRows: number;
  errors: Array<{ row: number; message: string }>;
  createdAt: string;
  completedAt: string | null;
}

// ─── Attachments & Documents ──────────────────────────────────────────────────

export interface PresignedUrl {
  url: string;
  key: string;
  fields: Record<string, string>;
}

export interface PresignParams {
  filename: string;
  contentType: string;
  entityType?: string;
  entityId?: string;
}

export interface Attachment {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  entityType: string;
  entityId: string;
  url: string;
  createdAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  entityType: string | null;
  entityId: string | null;
  size: number;
  createdAt: string;
}

export interface DocumentCreateParams {
  name: string;
  type: string;
  entityType?: string;
  entityId?: string;
}

export interface DocumentListParams extends PaginationParams {
  entityType?: string;
  entityId?: string;
  search?: string;
}

// ─── Export ───────────────────────────────────────────────────────────────────

export interface ExportParams {
  format?: "csv" | "xlsx" | "json";
  from?: string;
  to?: string;
}

// ─── Audit Log ────────────────────────────────────────────────────────────────

export interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  changes: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface AuditLogListParams extends PaginationParams {
  entityType?: string;
  entityId?: string;
  userId?: string;
  action?: string;
  from?: string;
  to?: string;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  entityType: string | null;
  entityId: string | null;
  createdAt: string;
}

export interface NotificationListParams extends PaginationParams {
  isRead?: boolean;
}

// ─── Trash ────────────────────────────────────────────────────────────────────

export interface TrashedItem {
  id: string;
  entityType: string;
  entityId: string;
  name: string;
  deletedAt: string;
  deletedBy: string;
}

export interface TrashListParams extends PaginationParams {
  entityType?: string;
}

// ─── Period Lock ──────────────────────────────────────────────────────────────

export interface PeriodLock {
  lockedUntil: string;
  lockedAt: string;
  lockedBy: string;
}

export interface PeriodLockParams {
  lockedUntil: string;
}

// ─── Exchange Rates ───────────────────────────────────────────────────────────

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  date: string;
}

export interface ExchangeRateParams {
  base?: string;
  symbols?: string;
  date?: string;
}

// ─── Currencies ───────────────────────────────────────────────────────────────

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  decimals: number;
}

// ─── Recurring Transactions ───────────────────────────────────────────────────

export type RecurringFrequency = "daily" | "weekly" | "biweekly" | "monthly" | "quarterly" | "annually";

export interface RecurringTransaction {
  id: string;
  name: string;
  frequency: RecurringFrequency;
  nextDate: string;
  endDate: string | null;
  isPaused: boolean;
  templateType: string;
  templateData: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface RecurringTransactionCreateParams {
  name: string;
  frequency: RecurringFrequency;
  nextDate: string;
  endDate?: string | null;
  templateType: string;
  templateData: Record<string, unknown>;
}
