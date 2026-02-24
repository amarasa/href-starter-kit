import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";

/** Basic email format validation. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Extract a best-effort client IP from the request headers. */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      email,
      company_name, // honeypot
    } = body as {
      email?: string;
      company_name?: string;
    };

    // Honeypot check: silent 200 for bots
    if (company_name) {
      return NextResponse.json(
        { success: true, message: "Subscribed successfully." },
        { status: 200 },
      );
    }

    // Validate email
    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // Rate limiting: max 3 per hour per IP
    const clientIp = getClientIp(request);

    if (isRateLimited(`subscribe:${clientIp}`)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many subscription attempts. Please try again later.",
        },
        { status: 429 },
      );
    }

    // Log the subscription (placeholder for email service integration)
    console.log("[Newsletter Subscription]", {
      email: email.trim(),
      ip: clientIp,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Subscribed successfully." },
      { status: 200 },
    );
  } catch {
    console.error("[Subscribe API] Failed to process subscription.");
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
