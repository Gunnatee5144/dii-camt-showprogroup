export type AnyRecord = Record<string, unknown>;

export const asRecord = (value: unknown): AnyRecord =>
  value && typeof value === "object" ? (value as AnyRecord) : {};

export const asArray = <T = unknown>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

export const asString = (value: unknown, fallback = "") =>
  typeof value === "string" && value.trim() ? value : fallback;

export const asNumber = (value: unknown, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

export const asBoolean = (value: unknown, fallback = false) =>
  typeof value === "boolean" ? value : fallback;

export const asDate = (value: unknown, fallback = new Date()) => {
  const date = value ? new Date(String(value)) : fallback;
  return Number.isNaN(date.getTime()) ? fallback : date;
};

export const pickLocalized = (source: AnyRecord, thaiKey: string, englishKey: string, fallback = "") =>
  asString(source[thaiKey], asString(source[englishKey], fallback));

export const roleToClient = (role: unknown) => asString(role, "student").toLowerCase();

export const compact = <T extends AnyRecord>(value: T) =>
  Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined && item !== "")) as T;
