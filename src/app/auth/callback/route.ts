import { NextResponse } from "next/server";
import { exchangeOAuthCode } from "@/lib/github";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID ?? "";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET ?? "";

const CALLBACK_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const state = searchParams.get("state");
  const next = searchParams.get("next") || "/dashboard";

  if (error || !code) {
    return NextResponse.redirect(
      `${CALLBACK_URL}/login?error=${encodeURIComponent(error || "missing_code")}`
    );
  }

  const tokenData = await exchangeOAuthCode(
    code,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    `${CALLBACK_URL}/auth/callback`
  );

  if (!tokenData) {
    return NextResponse.redirect(
      `${CALLBACK_URL}/login?error=${encodeURIComponent("token_exchange_failed")}`
    );
  }

  // Redirect to dashboard with token in URL (for client-side storage)
  // In production, this would be an httpOnly cookie via middleware
  return NextResponse.redirect(
    `${CALLBACK_URL}/dashboard?github_token=${tokenData.access_token}`
  );
}