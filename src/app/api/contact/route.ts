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
      name,
      email,
      phone,
      service,
      message,
      company_name, // honeypot
    } = body as {
      name?: string;
      email?: string;
      phone?: string;
      service?: string;
      message?: string;
      company_name?: string;
    };

    // Honeypot check: if the hidden field has a value, it was filled by a bot.
    // Return 200 silently so the bot thinks it succeeded.
    if (company_name) {
      return NextResponse.json(
        { success: true, message: "Message received." },
        { status: 200 },
      );
    }

    // Required field validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 },
      );
    }

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

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 },
      );
    }

    // Rate limiting: max 3 submissions per hour per IP
    const clientIp = getClientIp(request);

    if (isRateLimited(`contact:${clientIp}`)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You have submitted too many messages. Please try again later.",
        },
        { status: 429 },
      );
    }

    // Log the submission (placeholder for email/database integration)
    console.log("[Contact Form Submission]", {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      service: service?.trim() || null,
      message: message.trim(),
      ip: clientIp,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Message received." },
      { status: 200 },
    );
  } catch {
    console.error("[Contact API] Failed to process submission.");
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
