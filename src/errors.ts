export class DubblError extends Error {
  readonly status: number;
  readonly code: string | undefined;
  readonly requestId: string | undefined;

  constructor(
    message: string,
    status: number,
    code?: string,
    requestId?: string,
  ) {
    super(message);
    this.name = "DubblError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

export class AuthenticationError extends DubblError {
  constructor(message = "Invalid or missing API key", requestId?: string) {
    super(message, 401, "authentication_error", requestId);
    this.name = "AuthenticationError";
  }
}

export class PermissionError extends DubblError {
  constructor(message = "Insufficient permissions", requestId?: string) {
    super(message, 403, "permission_error", requestId);
    this.name = "PermissionError";
  }
}

export class NotFoundError extends DubblError {
  constructor(message = "Resource not found", requestId?: string) {
    super(message, 404, "not_found", requestId);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends DubblError {
  readonly errors: Array<{ field: string; message: string }>;

  constructor(
    message: string,
    errors: Array<{ field: string; message: string }> = [],
    requestId?: string,
  ) {
    super(message, 400, "validation_error", requestId);
    this.name = "ValidationError";
    this.errors = errors;
  }
}

export class PaymentRequiredError extends DubblError {
  constructor(
    message = "Upgrade your plan to access this feature",
    requestId?: string,
  ) {
    super(message, 402, "payment_required", requestId);
    this.name = "PaymentRequiredError";
  }
}

export class ConflictError extends DubblError {
  constructor(message = "Resource already exists", requestId?: string) {
    super(message, 409, "conflict", requestId);
    this.name = "ConflictError";
  }
}

export class PeriodLockedError extends DubblError {
  constructor(
    message = "The fiscal period is locked",
    requestId?: string,
  ) {
    super(message, 422, "period_locked", requestId);
    this.name = "PeriodLockedError";
  }
}

export class RateLimitError extends DubblError {
  readonly retryAfter: number | undefined;

  constructor(message = "Rate limit exceeded", retryAfter?: number, requestId?: string) {
    super(message, 429, "rate_limit_error", requestId);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

export class InternalServerError extends DubblError {
  constructor(message = "Internal server error", requestId?: string) {
    super(message, 500, "internal_error", requestId);
    this.name = "InternalServerError";
  }
}
