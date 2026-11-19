import { NextResponse } from "next/server";
import { getProduct } from "@/data/magnusData";
import { parseInquiryPayload } from "@/lib/validation";

/**
 * Prima B2B upite i zahteve za katalog.
 *
 * 1. Proverava podatke istim pravilima kao forma.
 * 2. Prosleđuje ih kao JSON na INQUIRY_WEBHOOK_URL (CRM, servis za email…).
 *
 * Ako INQUIRY_WEBHOOK_URL nije podešen:
 *  - u razvoju se upit ispisuje u konzoli servera i forma prikazuje uspeh;
 *  - u produkciji se vraća greška, da posetilac ne dobije lažnu potvrdu.
 */
export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_json" }, { status: 400 });
  }

  const parsed = parseInquiryPayload(input);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, code: "invalid_fields", fields: parsed.fields },
      { status: 422 },
    );
  }

  const { payload } = parsed;

  // Popunjeno polje-zamka znači bot: odgovaramo uspehom i ništa ne prosleđujemo.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const record = {
    kind: payload.kind,
    lang: payload.lang,
    receivedAt: new Date().toISOString(),
    ...payload.values,
    ...(payload.kind === "b2b"
      ? {
          productId: payload.productId,
          productName: payload.productId
            ? (getProduct(payload.productId)?.name.sr ?? null)
            : null,
        }
      : {}),
  };

  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;

  if (!webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[Magnus] Upit primljen (razvojni režim, nije prosleđen):\n", record);
      return NextResponse.json({ ok: true, delivered: false });
    }
    console.error("[Magnus] INQUIRY_WEBHOOK_URL nije podešen — upit nije prosleđen.");
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      throw new Error(`Webhook je vratio status ${response.status}`);
    }
  } catch (error) {
    console.error("[Magnus] Prosleđivanje upita nije uspelo:", error);
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
