import type { CategoryId, CooperationType, Lang } from "@/data/magnusData";

/**
 * Pravila validacije dele klijent (trenutna povratna informacija u formi)
 * i server (app/api/inquiry/route.ts), da bi oba mesta primenjivala isto.
 */

export interface InquiryValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  type: CooperationType | "";
  message: string;
}

export type InquiryField = keyof InquiryValues;

export const EMPTY_INQUIRY: InquiryValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  type: "",
  message: "",
};

export type BuyerType = "licno" | "maloprodaja" | "veleprodaja" | "horeca" | "distribucija";

export interface CatalogValues {
  name: string;
  email: string;
  company: string;
  lines: CategoryId[];
  buyer: BuyerType;
}

export type CatalogField = "name" | "email" | "lines";

export const EMPTY_CATALOG: CatalogValues = {
  name: "",
  email: "",
  company: "",
  lines: ["meso", "testo"],
  buyer: "licno",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const COOPERATION_TYPES: ReadonlyArray<string> = [
  "veleprodaja",
  "maloprodaja",
  "horeca",
  "izvoz",
  "ostalo",
];
const BUYER_TYPES: ReadonlyArray<string> = [
  "licno",
  "maloprodaja",
  "veleprodaja",
  "horeca",
  "distribucija",
];
const LINES: ReadonlyArray<string> = ["meso", "testo"];

export const isValidEmail = (value: string): boolean => EMAIL_PATTERN.test(value.trim());

export const isValidPhone = (value: string): boolean => {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  return /^[+\d\s()/.-]+$/.test(trimmed) && digits.length >= 6 && digits.length <= 15;
};

export const isInquiryFieldValid = (field: InquiryField, values: InquiryValues): boolean => {
  switch (field) {
    case "name":
      return values.name.trim().length >= 2;
    case "company":
      return values.company.trim().length >= 2;
    case "email":
      return isValidEmail(values.email);
    case "phone":
      return isValidPhone(values.phone);
    case "type":
      return COOPERATION_TYPES.includes(values.type);
    case "message":
      return values.message.trim().length >= 10;
  }
};

export const INQUIRY_FIELDS: ReadonlyArray<InquiryField> = [
  "name",
  "company",
  "email",
  "phone",
  "type",
  "message",
];

export const getInvalidInquiryFields = (values: InquiryValues): InquiryField[] =>
  INQUIRY_FIELDS.filter((field) => !isInquiryFieldValid(field, values));

export const isCatalogFieldValid = (field: CatalogField, values: CatalogValues): boolean => {
  switch (field) {
    case "name":
      return values.name.trim().length >= 2;
    case "email":
      return isValidEmail(values.email);
    case "lines":
      return values.lines.length > 0;
  }
};

export const CATALOG_FIELDS: ReadonlyArray<CatalogField> = ["name", "email", "lines"];

export const getInvalidCatalogFields = (values: CatalogValues): CatalogField[] =>
  CATALOG_FIELDS.filter((field) => !isCatalogFieldValid(field, values));

/* ------------------------------------------------------------------ */
/* Poruka koju forma šalje serveru                                     */
/* ------------------------------------------------------------------ */

export type InquiryPayload =
  | {
      kind: "b2b";
      lang: Lang;
      values: InquiryValues;
      productId: string | null;
      /** Polje-zamka za botove; ljudi ga ne vide i ostaje prazno */
      website: string;
    }
  | {
      kind: "catalog";
      lang: Lang;
      values: CatalogValues;
      website: string;
    };

type ParseResult =
  | { ok: true; payload: InquiryPayload }
  | { ok: false; fields: string[] };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const text = (value: unknown, max: number): string =>
  typeof value === "string" ? value.slice(0, max) : "";

/** Server: proverava i čisti primljeni JSON pre prosleđivanja. */
export function parseInquiryPayload(input: unknown): ParseResult {
  if (!isRecord(input) || !isRecord(input.values)) {
    return { ok: false, fields: ["payload"] };
  }

  const lang: Lang = input.lang === "en" ? "en" : "sr";
  const website = text(input.website, 200);
  const raw = input.values;

  if (input.kind === "b2b") {
    const values: InquiryValues = {
      name: text(raw.name, 120).trim(),
      company: text(raw.company, 160).trim(),
      email: text(raw.email, 160).trim(),
      phone: text(raw.phone, 40).trim(),
      type: COOPERATION_TYPES.includes(text(raw.type, 20))
        ? (text(raw.type, 20) as CooperationType)
        : "",
      message: text(raw.message, 2000).trim(),
    };
    const invalid = getInvalidInquiryFields(values);
    if (invalid.length > 0) return { ok: false, fields: invalid };
    return {
      ok: true,
      payload: {
        kind: "b2b",
        lang,
        values,
        productId: typeof input.productId === "string" ? input.productId.slice(0, 80) : null,
        website,
      },
    };
  }

  if (input.kind === "catalog") {
    const lines = Array.isArray(raw.lines)
      ? (raw.lines.filter(
          (line): line is CategoryId => typeof line === "string" && LINES.includes(line),
        ) as CategoryId[])
      : [];
    const buyer = text(raw.buyer, 20);
    const values: CatalogValues = {
      name: text(raw.name, 120).trim(),
      email: text(raw.email, 160).trim(),
      company: text(raw.company, 160).trim(),
      lines: Array.from(new Set(lines)),
      buyer: BUYER_TYPES.includes(buyer) ? (buyer as BuyerType) : "licno",
    };
    const invalid = getInvalidCatalogFields(values);
    if (invalid.length > 0) return { ok: false, fields: invalid };
    return { ok: true, payload: { kind: "catalog", lang, values, website } };
  }

  return { ok: false, fields: ["kind"] };
}
