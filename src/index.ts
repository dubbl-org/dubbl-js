import { HttpClient } from "./client.js";
import type { DubblOptions } from "./types.js";

import { OrganizationResource } from "./resources/organization.js";
import { MembersResource } from "./resources/members.js";
import { AccountsResource } from "./resources/accounts.js";
import { EntriesResource } from "./resources/entries.js";
import { InvoicesResource } from "./resources/invoices.js";
import { QuotesResource } from "./resources/quotes.js";
import { BillsResource } from "./resources/bills.js";
import { ContactsResource } from "./resources/contacts.js";
import { TaxRatesResource } from "./resources/tax-rates.js";
import { BankAccountsResource } from "./resources/bank-accounts.js";
import { FiscalYearsResource } from "./resources/fiscal-years.js";
import { ApiKeysResource } from "./resources/api-keys.js";
import { BillingResource } from "./resources/billing.js";
import { ReportsResource } from "./resources/reports.js";
import { PayrollResource } from "./resources/payroll.js";
import { InventoryResource } from "./resources/inventory.js";
import { ProjectsResource } from "./resources/projects.js";
import { CrmResource } from "./resources/crm.js";
import { WebhooksResource } from "./resources/webhooks.js";
import { BulkResource } from "./resources/bulk.js";
import { AttachmentsResource } from "./resources/attachments.js";
import { DocumentsResource } from "./resources/documents.js";
import { ExportsResource } from "./resources/exports.js";
import { AuditLogResource } from "./resources/audit-log.js";
import { NotificationsResource } from "./resources/notifications.js";
import { TrashResource } from "./resources/trash.js";
import { PeriodLockResource } from "./resources/period-lock.js";
import { ExchangeRatesResource } from "./resources/exchange-rates.js";
import { CurrenciesResource } from "./resources/currencies.js";
import { RecurringResource } from "./resources/recurring.js";

export class Dubbl {
  private readonly client: HttpClient;

  readonly organization: OrganizationResource;
  readonly members: MembersResource;
  readonly accounts: AccountsResource;
  readonly entries: EntriesResource;
  readonly invoices: InvoicesResource;
  readonly quotes: QuotesResource;
  readonly bills: BillsResource;
  readonly contacts: ContactsResource;
  readonly taxRates: TaxRatesResource;
  readonly bankAccounts: BankAccountsResource;
  readonly fiscalYears: FiscalYearsResource;
  readonly apiKeys: ApiKeysResource;
  readonly billing: BillingResource;
  readonly reports: ReportsResource;
  readonly payroll: PayrollResource;
  readonly inventory: InventoryResource;
  readonly projects: ProjectsResource;
  readonly crm: CrmResource;
  readonly webhooks: WebhooksResource;
  readonly bulk: BulkResource;
  readonly attachments: AttachmentsResource;
  readonly documents: DocumentsResource;
  readonly exports: ExportsResource;
  readonly auditLog: AuditLogResource;
  readonly notifications: NotificationsResource;
  readonly trash: TrashResource;
  readonly periodLock: PeriodLockResource;
  readonly exchangeRates: ExchangeRatesResource;
  readonly currencies: CurrenciesResource;
  readonly recurring: RecurringResource;

  constructor(options: DubblOptions) {
    this.client = new HttpClient(options);

    this.organization = new OrganizationResource(this.client);
    this.members = new MembersResource(this.client);
    this.accounts = new AccountsResource(this.client);
    this.entries = new EntriesResource(this.client);
    this.invoices = new InvoicesResource(this.client);
    this.quotes = new QuotesResource(this.client);
    this.bills = new BillsResource(this.client);
    this.contacts = new ContactsResource(this.client);
    this.taxRates = new TaxRatesResource(this.client);
    this.bankAccounts = new BankAccountsResource(this.client);
    this.fiscalYears = new FiscalYearsResource(this.client);
    this.apiKeys = new ApiKeysResource(this.client);
    this.billing = new BillingResource(this.client);
    this.reports = new ReportsResource(this.client);
    this.payroll = new PayrollResource(this.client);
    this.inventory = new InventoryResource(this.client);
    this.projects = new ProjectsResource(this.client);
    this.crm = new CrmResource(this.client);
    this.webhooks = new WebhooksResource(this.client);
    this.bulk = new BulkResource(this.client);
    this.attachments = new AttachmentsResource(this.client);
    this.documents = new DocumentsResource(this.client);
    this.exports = new ExportsResource(this.client);
    this.auditLog = new AuditLogResource(this.client);
    this.notifications = new NotificationsResource(this.client);
    this.trash = new TrashResource(this.client);
    this.periodLock = new PeriodLockResource(this.client);
    this.exchangeRates = new ExchangeRatesResource(this.client);
    this.currencies = new CurrenciesResource(this.client);
    this.recurring = new RecurringResource(this.client);
  }
}

// Re-export everything
export { HttpClient } from "./client.js";
export * from "./types.js";
export * from "./errors.js";

// Default export
export default Dubbl;
