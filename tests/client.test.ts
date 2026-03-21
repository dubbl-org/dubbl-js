import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpClient } from "../src/client.js";
import {
  AuthenticationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  DubblError,
} from "../src/errors.js";

function mockFetch(response: {
  status: number;
  body?: unknown;
  headers?: Record<string, string>;
}) {
  return vi.fn().mockResolvedValue({
    ok: response.status >= 200 && response.status < 300,
    status: response.status,
    statusText: "OK",
    headers: new Headers({
      "content-type": "application/json",
      ...(response.headers ?? {}),
    }),
    json: () => Promise.resolve(response.body),
    blob: () => Promise.resolve(new Blob()),
  });
}

describe("HttpClient", () => {
  it("throws if no API key is provided", () => {
    expect(() => new HttpClient({ apiKey: "" })).toThrow(
      "An API key is required",
    );
  });

  it("sends correct authorization header", async () => {
    const fetch = mockFetch({ status: 200, body: { data: "test" } });
    const client = new HttpClient({
      apiKey: "dk_test_key",
      fetch,
      maxRetries: 0,
    });

    await client.get("/api/v1/test");

    expect(fetch).toHaveBeenCalledOnce();
    const call = fetch.mock.calls[0];
    expect(call[1].headers.Authorization).toBe("Bearer dk_test_key");
  });

  it("includes organization ID header when set", async () => {
    const fetch = mockFetch({ status: 200, body: {} });
    const client = new HttpClient({
      apiKey: "dk_test",
      organizationId: "org_123",
      fetch,
      maxRetries: 0,
    });

    await client.get("/api/v1/test");

    const call = fetch.mock.calls[0];
    expect(call[1].headers["X-Organization-ID"]).toBe("org_123");
  });

  it("appends query parameters to URL", async () => {
    const fetch = mockFetch({ status: 200, body: {} });
    const client = new HttpClient({
      apiKey: "dk_test",
      baseUrl: "https://api.example.com",
      fetch,
      maxRetries: 0,
    });

    await client.get("/api/v1/invoices", {
      page: 2,
      limit: 25,
      status: "sent",
    });

    const url = fetch.mock.calls[0][0];
    expect(url).toContain("page=2");
    expect(url).toContain("limit=25");
    expect(url).toContain("status=sent");
  });

  it("skips null/undefined query params", async () => {
    const fetch = mockFetch({ status: 200, body: {} });
    const client = new HttpClient({
      apiKey: "dk_test",
      fetch,
      maxRetries: 0,
    });

    await client.get("/api/v1/test", {
      page: 1,
      search: null,
      filter: undefined,
    });

    const url = fetch.mock.calls[0][0] as string;
    expect(url).toContain("page=1");
    expect(url).not.toContain("search");
    expect(url).not.toContain("filter");
  });

  it("sends JSON body for POST requests", async () => {
    const fetch = mockFetch({ status: 201, body: { id: "123" } });
    const client = new HttpClient({
      apiKey: "dk_test",
      fetch,
      maxRetries: 0,
    });

    await client.post("/api/v1/contacts", { name: "Test" });

    const call = fetch.mock.calls[0];
    expect(call[1].method).toBe("POST");
    expect(call[1].body).toBe(JSON.stringify({ name: "Test" }));
  });

  it("throws AuthenticationError on 401", async () => {
    const fetch = mockFetch({
      status: 401,
      body: { error: "Invalid API key" },
    });
    const client = new HttpClient({
      apiKey: "dk_bad",
      fetch,
      maxRetries: 0,
    });

    await expect(client.get("/api/v1/test")).rejects.toThrow(
      AuthenticationError,
    );
  });

  it("throws NotFoundError on 404", async () => {
    const fetch = mockFetch({
      status: 404,
      body: { error: "Not found" },
    });
    const client = new HttpClient({
      apiKey: "dk_test",
      fetch,
      maxRetries: 0,
    });

    await expect(client.get("/api/v1/test/missing")).rejects.toThrow(
      NotFoundError,
    );
  });

  it("throws ValidationError on 400 with field errors", async () => {
    const fetch = mockFetch({
      status: 400,
      body: {
        error: "Validation failed",
        errors: [{ field: "name", message: "Required" }],
      },
    });
    const client = new HttpClient({
      apiKey: "dk_test",
      fetch,
      maxRetries: 0,
    });

    try {
      await client.post("/api/v1/contacts", {});
      expect.unreachable("Should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).errors).toHaveLength(1);
      expect((error as ValidationError).errors[0].field).toBe("name");
    }
  });

  it("retries on 500 errors", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        headers: new Headers({ "content-type": "application/json" }),
        json: () => Promise.resolve({ error: "Server error" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: () => Promise.resolve({ data: "success" }),
      });

    const client = new HttpClient({
      apiKey: "dk_test",
      fetch,
      maxRetries: 2,
    });

    const result = await client.get<{ data: string }>("/api/v1/test");
    expect(result.data).toBe("success");
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("strips trailing slashes from base URL", () => {
    const fetch = mockFetch({ status: 200, body: {} });
    const client = new HttpClient({
      apiKey: "dk_test",
      baseUrl: "https://api.example.com///",
      fetch,
    });

    expect(client.baseUrl).toBe("https://api.example.com");
  });

  it("uses default base URL when not provided", () => {
    const fetch = mockFetch({ status: 200, body: {} });
    const client = new HttpClient({ apiKey: "dk_test", fetch });
    expect(client.baseUrl).toBe("https://dubbl.dev");
  });
});

describe("Dubbl class", () => {
  it("initializes all resources", async () => {
    const { Dubbl } = await import("../src/index.js");
    const dubbl = new Dubbl({ apiKey: "dk_test" });

    expect(dubbl.organization).toBeDefined();
    expect(dubbl.members).toBeDefined();
    expect(dubbl.accounts).toBeDefined();
    expect(dubbl.entries).toBeDefined();
    expect(dubbl.invoices).toBeDefined();
    expect(dubbl.quotes).toBeDefined();
    expect(dubbl.bills).toBeDefined();
    expect(dubbl.contacts).toBeDefined();
    expect(dubbl.taxRates).toBeDefined();
    expect(dubbl.bankAccounts).toBeDefined();
    expect(dubbl.fiscalYears).toBeDefined();
    expect(dubbl.apiKeys).toBeDefined();
    expect(dubbl.billing).toBeDefined();
    expect(dubbl.reports).toBeDefined();
    expect(dubbl.payroll).toBeDefined();
    expect(dubbl.inventory).toBeDefined();
    expect(dubbl.projects).toBeDefined();
    expect(dubbl.crm).toBeDefined();
    expect(dubbl.webhooks).toBeDefined();
    expect(dubbl.bulk).toBeDefined();
    expect(dubbl.attachments).toBeDefined();
    expect(dubbl.documents).toBeDefined();
    expect(dubbl.exports).toBeDefined();
    expect(dubbl.auditLog).toBeDefined();
    expect(dubbl.notifications).toBeDefined();
    expect(dubbl.trash).toBeDefined();
    expect(dubbl.periodLock).toBeDefined();
    expect(dubbl.exchangeRates).toBeDefined();
    expect(dubbl.currencies).toBeDefined();
    expect(dubbl.recurring).toBeDefined();
  });

  it("has nested sub-resources", async () => {
    const { Dubbl } = await import("../src/index.js");
    const dubbl = new Dubbl({ apiKey: "dk_test" });

    // Payroll sub-resources
    expect(dubbl.payroll.employees).toBeDefined();
    expect(dubbl.payroll.runs).toBeDefined();
    expect(dubbl.payroll.leave).toBeDefined();
    expect(dubbl.payroll.timesheets).toBeDefined();

    // Inventory sub-resources
    expect(dubbl.inventory.categories).toBeDefined();
    expect(dubbl.inventory.bom).toBeDefined();
    expect(dubbl.inventory.transfers).toBeDefined();
    expect(dubbl.inventory.assemblyOrders).toBeDefined();

    // CRM sub-resources
    expect(dubbl.crm.deals).toBeDefined();
    expect(dubbl.crm.pipelines).toBeDefined();
  });
});

describe("Error classes", () => {
  it("DubblError has correct properties", () => {
    const error = new DubblError("test error", 400, "test_code", "req_123");
    expect(error.message).toBe("test error");
    expect(error.status).toBe(400);
    expect(error.code).toBe("test_code");
    expect(error.requestId).toBe("req_123");
    expect(error.name).toBe("DubblError");
    expect(error).toBeInstanceOf(Error);
  });

  it("AuthenticationError defaults to 401", () => {
    const error = new AuthenticationError();
    expect(error.status).toBe(401);
    expect(error.name).toBe("AuthenticationError");
  });

  it("ValidationError includes field errors", () => {
    const errors = [{ field: "email", message: "Invalid email" }];
    const error = new ValidationError("Validation failed", errors);
    expect(error.errors).toEqual(errors);
    expect(error.status).toBe(400);
  });

  it("RateLimitError includes retryAfter", () => {
    const error = new RateLimitError("Too many requests", 30);
    expect(error.retryAfter).toBe(30);
    expect(error.status).toBe(429);
  });
});
