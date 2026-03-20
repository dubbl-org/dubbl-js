<p align="center">
  <img src="logo.svg" alt="Dubbl" width="120" />
</p>

<h1 align="center">Dubbl Node.js SDK</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/dubbl"><img src="https://img.shields.io/npm/v/dubbl.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/dubbl"><img src="https://img.shields.io/npm/dm/dubbl.svg" alt="npm downloads" /></a>
  <a href="https://github.com/dubbl-org/dubbl-js/actions/workflows/ci.yml"><img src="https://github.com/dubbl-org/dubbl-js/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg" alt="TypeScript" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%3E%3D18-green.svg" alt="Node.js" /></a>
</p>

The official Node.js/TypeScript client library for the [Dubbl](https://dubbl.dev) API. Full-featured SDK for accounting, invoicing, payroll, inventory, CRM, and more.

## Installation

```bash
# npm
npm install dubbl

# pnpm
pnpm add dubbl

# yarn
yarn add dubbl
```

## Quick Start

```typescript
import Dubbl from "dubbl";

const dubbl = new Dubbl({
  apiKey: "dk_your_api_key_here",
});

// List all invoices
const { data: invoices, pagination } = await dubbl.invoices.list({
  status: "sent",
  limit: 25,
});

// Create a contact
const contact = await dubbl.contacts.create({
  name: "Acme Corp",
  email: "billing@acme.com",
  type: "customer",
});

// Create and send an invoice
const invoice = await dubbl.invoices.create({
  contactId: contact.id,
  issueDate: "2026-03-20",
  dueDate: "2026-04-19",
  lines: [
    {
      description: "Consulting services",
      quantity: 10,
      unitPrice: 15000, // $150.00 in cents
    },
  ],
});

await dubbl.invoices.send(invoice.id, {
  sendEmail: true,
  recipientEmail: "billing@acme.com",
});
```

## Configuration

```typescript
const dubbl = new Dubbl({
  // Required: Your API key (format: dk_<key>)
  apiKey: "dk_your_api_key_here",

  // Optional: Base URL (defaults to https://app.dubbl.dev)
  baseUrl: "https://app.dubbl.dev",

  // Optional: Organization ID (required if your account has multiple orgs)
  organizationId: "org_123",

  // Optional: Request timeout in ms (default: 30000)
  timeout: 30000,

  // Optional: Max retries on 5xx/network errors (default: 2)
  maxRetries: 2,

  // Optional: Custom fetch implementation
  fetch: customFetch,
});
```

## Resources

The SDK provides access to all Dubbl API resources:

| Resource | Description |
|---|---|
| `dubbl.organization` | Organization settings |
| `dubbl.members` | Team members & invitations |
| `dubbl.accounts` | Chart of accounts |
| `dubbl.entries` | Journal entries |
| `dubbl.invoices` | Sales invoices |
| `dubbl.quotes` | Quotes & estimates |
| `dubbl.bills` | Purchase bills |
| `dubbl.contacts` | Customers & suppliers |
| `dubbl.taxRates` | Tax rates |
| `dubbl.bankAccounts` | Bank accounts & transactions |
| `dubbl.fiscalYears` | Fiscal year management |
| `dubbl.apiKeys` | API key management |
| `dubbl.billing` | Subscription & billing |
| `dubbl.reports` | 30+ financial reports |
| `dubbl.payroll` | Employees, payroll runs, leave, timesheets |
| `dubbl.inventory` | Stock, categories, BOMs, transfers, assembly |
| `dubbl.projects` | Projects, tasks, time tracking |
| `dubbl.crm` | Deals & pipelines |
| `dubbl.webhooks` | Webhook management |
| `dubbl.bulk` | Bulk import & operations |
| `dubbl.attachments` | File attachments |
| `dubbl.documents` | Document management |
| `dubbl.exports` | Data export (CSV, XLSX, JSON) |
| `dubbl.auditLog` | Audit trail |
| `dubbl.notifications` | Notification management |
| `dubbl.trash` | Deleted item recovery |
| `dubbl.periodLock` | Fiscal period locking |
| `dubbl.exchangeRates` | Currency exchange rates |
| `dubbl.currencies` | Supported currencies |
| `dubbl.recurring` | Recurring transactions |

## Usage Examples

### Journal Entries

```typescript
// Create a journal entry
const entry = await dubbl.entries.create({
  date: "2026-03-20",
  description: "Office rent payment",
  lines: [
    { accountId: "acc_rent", debitAmount: 200000, creditAmount: 0 },
    { accountId: "acc_bank", debitAmount: 0, creditAmount: 200000 },
  ],
});

// Post the entry to the ledger
await dubbl.entries.post(entry.id);
```

### Bills & Payments

```typescript
// Create and pay a bill
const bill = await dubbl.bills.create({
  contactId: "supplier_id",
  issueDate: "2026-03-15",
  dueDate: "2026-04-15",
  lines: [
    { description: "Raw materials", quantity: 100, unitPrice: 500 },
  ],
});

await dubbl.bills.receive(bill.id);
await dubbl.bills.pay(bill.id, {
  amount: bill.total,
  date: "2026-03-20",
  method: "bank_transfer",
});
```

### Financial Reports

```typescript
// Generate a profit & loss report
const pnl = await dubbl.reports.profitAndLoss({
  from: "2026-01-01",
  to: "2026-03-31",
});

// Balance sheet
const balanceSheet = await dubbl.reports.balanceSheet({
  to: "2026-03-31",
});

// Aged receivables
const aging = await dubbl.reports.agedReceivables();
```

### Payroll

```typescript
// Create an employee
const employee = await dubbl.payroll.employees.create({
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@company.com",
  employmentType: "full_time",
  payFrequency: "monthly",
  baseSalary: 7500000, // $75,000 in cents
  startDate: "2026-01-15",
});

// Run payroll
const run = await dubbl.payroll.runs.create({
  periodStart: "2026-03-01",
  periodEnd: "2026-03-31",
  payDate: "2026-03-31",
});

await dubbl.payroll.runs.generatePayslips(run.id);
await dubbl.payroll.runs.submitForApproval(run.id);
await dubbl.payroll.runs.approve(run.id);
await dubbl.payroll.runs.process(run.id);
```

### Inventory

```typescript
// Create an inventory item
const item = await dubbl.inventory.create({
  name: "Widget A",
  sku: "WGT-001",
  costPrice: 1000,
  sellPrice: 2500,
  quantityOnHand: 100,
  reorderPoint: 20,
});

// Adjust stock
await dubbl.inventory.adjust(item.id, {
  quantity: -5,
  reason: "Damaged goods",
});
```

### Webhooks

```typescript
// Subscribe to invoice events
const webhook = await dubbl.webhooks.create({
  url: "https://your-app.com/webhooks/dubbl",
  events: ["invoice.created", "invoice.paid", "payment.created"],
});

// Test the webhook
await dubbl.webhooks.test(webhook.id);
```

### Bulk Operations

```typescript
// Bulk import contacts
const result = await dubbl.bulk.importContacts([
  { name: "Client A", email: "a@test.com", type: "customer" },
  { name: "Client B", email: "b@test.com", type: "customer" },
]);

console.log(`Imported: ${result.imported}, Skipped: ${result.skipped}`);
```

## Pagination

All list methods return paginated results:

```typescript
const { data, pagination } = await dubbl.invoices.list({
  page: 1,
  limit: 50,
  status: "sent",
  sortBy: "date",
  sortOrder: "desc",
});

console.log(`Page ${pagination.page} of ${pagination.totalPages}`);
console.log(`Total invoices: ${pagination.total}`);
```

## Error Handling

The SDK throws typed errors for different HTTP status codes:

```typescript
import {
  DubblError,
  AuthenticationError,
  ValidationError,
  NotFoundError,
  PermissionError,
  RateLimitError,
} from "dubbl";

try {
  await dubbl.invoices.get("non-existent-id");
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log("Invoice not found");
  } else if (error instanceof ValidationError) {
    console.log("Validation failed:", error.errors);
  } else if (error instanceof AuthenticationError) {
    console.log("Invalid API key");
  } else if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after: ${error.retryAfter}s`);
  } else if (error instanceof PermissionError) {
    console.log("Insufficient permissions");
  } else if (error instanceof DubblError) {
    console.log(`API error ${error.status}: ${error.message}`);
  }
}
```

All errors include:
- `status` — HTTP status code
- `message` — Error message from the API
- `code` — Machine-readable error code
- `requestId` — Request ID for debugging

## TypeScript

This library is written in TypeScript and ships with complete type definitions. All request parameters and response types are fully typed:

```typescript
import type {
  Invoice,
  InvoiceCreateParams,
  Contact,
  ContactType,
  PaginatedResponse,
} from "dubbl";

// Parameters are fully typed
const params: InvoiceCreateParams = {
  contactId: "contact_123",
  issueDate: "2026-03-20",
  lines: [
    {
      description: "Service",
      quantity: 1,
      unitPrice: 10000,
    },
  ],
};

// Responses are fully typed
const invoice: Invoice = await dubbl.invoices.create(params);
```

## Amounts

All monetary amounts in the Dubbl API are represented as **integers in cents** (smallest currency unit). For example:

- `$100.00` → `10000`
- `$1,500.50` → `150050`

## Request Options

Every method accepts an optional `RequestOptions` parameter:

```typescript
await dubbl.invoices.list(
  { status: "sent" },
  {
    // Additional headers
    headers: { "X-Custom-Header": "value" },
    // Abort signal for cancellation
    signal: controller.signal,
    // Override timeout for this request
    timeout: 60000,
  },
);
```

## Retries

The SDK automatically retries failed requests on:
- Network errors
- HTTP 408, 429, 500, 502, 503, 504 status codes

Retries use exponential backoff with jitter. Configure via the `maxRetries` option (default: 2).

## Requirements

- Node.js 18 or later
- A Dubbl account with API access (Pro plan or above)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](./LICENSE) &copy; [Dubbl](https://dubbl.dev)
