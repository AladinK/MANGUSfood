import type { InquiryPayload } from "./validation";

const TIMEOUT_MS = 15_000;

/**
 * Šalje upit ili zahtev za katalog na /api/inquiry.
 * Baca grešku ako server ne potvrdi prijem, da bi forma prikazala stanje greške.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Upit nije primljen (status ${response.status}).`);
    }
  } finally {
    window.clearTimeout(timeout);
  }
}
