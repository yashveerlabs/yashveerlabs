import { NextResponse } from "next/server";

export const runtime = "edge";

/**
 * Legacy fallback. Contact submission now opens a WhatsApp deep link
 * client-side. This endpoint remains as a 200 no-op so any stale form
 * shell does not surface an error in production.
 */
export async function POST() {
  return NextResponse.json({
    ok: true,
    delivered: false,
    note: "Contact has moved to WhatsApp. Use wa.me/918700535147.",
  });
}
