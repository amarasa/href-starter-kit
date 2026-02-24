"use client";

import { useState, useId, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

/** Validate an email address format. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface NewsletterSignupProps {
  /** Additional classes for the outermost wrapper */
  className?: string;
  /** Heading text above the form */
  heading?: string;
  /** Description text below the heading */
  description?: string;
}

export function NewsletterSignup({
  className = "",
  heading,
  description,
}: NewsletterSignupProps) {
  const formId = useId();

  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Client-side validation
    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("Email is required.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          company_name: honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Unable to subscribe. Please try again later.");
    }
  }

  const inputId = `${formId}-email`;
  const statusId = `${formId}-status`;

  // Success state
  if (status === "success") {
    return (
      <div
        className={`flex items-center gap-2 ${className}`.trim()}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2
          className="h-5 w-5 text-green-600 shrink-0"
          aria-hidden="true"
        />
        <p className="text-sm text-green-700 font-medium">
          You&apos;re subscribed! Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {heading && (
        <h3 className="text-lg font-semibold text-text font-heading mb-1">
          {heading}
        </h3>
      )}
      {description && (
        <p className="text-sm text-text-muted mb-3">{description}</p>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Newsletter signup"
      >
        {/* Honeypot: invisible to real users */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] -top-[9999px]"
        >
          <label htmlFor={`${formId}-hp`}>
            Do not fill this field
            <input
              id={`${formId}-hp`}
              type="text"
              name="company_name"
              autoComplete="off"
              tabIndex={-1}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>
        </div>

        <div className="flex">
          <div className="flex-1 min-w-0">
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <input
              id={inputId}
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setErrorMessage("");
                }
              }}
              aria-invalid={status === "error" ? "true" : undefined}
              aria-describedby={status === "error" ? statusId : undefined}
              className={[
                "block w-full rounded-l-xl border px-4 py-3 text-base text-text",
                "bg-surface placeholder:text-text-muted/60",
                "transition-all duration-150",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:z-10 relative",
                status === "error"
                  ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                  : "border-border",
              ].join(" ")}
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className={[
              "inline-flex items-center justify-center gap-2",
              "rounded-r-xl px-5 py-3 text-base font-semibold text-white",
              "bg-accent hover:opacity-90 active:opacity-80",
              "transition-all duration-150 shrink-0",
              "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            ].join(" ")}
          >
            {status === "submitting" ? (
              <Loader2
                className="h-5 w-5 animate-spin"
                aria-label="Subscribing"
              />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>

        {status === "error" && errorMessage && (
          <div
            id={statusId}
            className="flex items-center gap-2 mt-2"
            role="alert"
          >
            <AlertCircle
              className="h-4 w-4 text-red-600 shrink-0"
              aria-hidden="true"
            />
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
}
