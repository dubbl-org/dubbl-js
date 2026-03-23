import type { PaginatedResponse } from "../types.js";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function toNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function unwrap<T>(value: unknown, ...keys: string[]): T {
  if (!isRecord(value)) {
    return value as T;
  }

  for (const key of keys) {
    if (key in value) {
      return value[key] as T;
    }
  }

  return value as T;
}

export function unwrapList<T>(value: unknown, ...keys: string[]): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (!isRecord(value)) {
    return [];
  }

  for (const key of keys) {
    const candidate = value[key];
    if (Array.isArray(candidate)) {
      return candidate as T[];
    }
  }

  if (Array.isArray(value.data)) {
    return value.data as T[];
  }

  return [];
}

export function unwrapPaginated<T>(
  value: unknown,
  ...keys: string[]
): PaginatedResponse<T> {
  if (
    isRecord(value) &&
    Array.isArray(value.data) &&
    isRecord(value.pagination)
  ) {
    const pagination = value.pagination;
    return {
      data: value.data as T[],
      pagination: {
        page: toNumber(pagination.page, 1),
        limit: toNumber(pagination.limit, (value.data as T[]).length),
        total: toNumber(pagination.total, (value.data as T[]).length),
        totalPages: toNumber(pagination.totalPages, 1),
      },
    };
  }

  const data = unwrapList<T>(value, ...keys);
  const total =
    isRecord(value) && typeof value.total === "number" ? value.total : data.length;
  const limit = data.length === 0 ? total || 1 : data.length;

  return {
    data,
    pagination: {
      page: 1,
      limit,
      total,
      totalPages: total === 0 ? 0 : Math.max(1, Math.ceil(total / limit)),
    },
  };
}
