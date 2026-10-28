import { NextResponse } from "next/server";

/**
 * Publishing boundary for the Social Growth Agent.
 *
 * Intentionally fails closed until a server-side publisher is configured. The
 * future implementation should verify the draft's latest approval, load the
 * encrypted LinkedIn token, and call LinkedIn's official API. Grok should call
 * this route/webhook only as a tool; it must never receive OAuth tokens.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { draftId?: number; destinations?: string[] }
    | null;

  if (!body?.draftId || !body.destinations?.length) {
    return NextResponse.json({ error: "draftId and destinations are required" }, { status: 400 });
  }

  return NextResponse.json(
    {
      error: "Publishing is not configured",
      message: "Connect the official LinkedIn OAuth publisher and Grok webhook before enabling external posts.",
    },
    { status: 503 },
  );
}
