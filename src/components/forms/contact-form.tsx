"use client";

import { useState, useId, type FormEvent } from "react";
import { Input, Textarea, Button } from "@/components/ui";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const SERVICE_OPTIONS = [
  "Tax Preparation",
  "Bookkeeping & Accounting",
  "Tax Planning",
  "Audit & Assurance",
  "Business Advisory",
  "Payroll Services",
  "Other",
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/** Validate an email address format. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface ContactFormProps {
  /** Additional classes for the outermost wrapper */
  className?: string;
}

export function ContactForm({ className = "" }: ContactFormProps) {
  const formId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  /** Client-side validation before submit. */
  function validate(): FormErrors {
    const errors: FormErrors = {};

    if (!name.trim()) {
      errors.name = "Name is required.";
    }

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!message.trim()) {
      errors.message = "Message is required.";
    }

    return errors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Run client validation first
    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          service: service || undefined,
          message: message.trim(),
          company_name: honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setServerError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setServerError("Unable to send your message. Please try again later.");
    }
  }

  // Service select IDs for accessibility
  const serviceSelectId = `${formId}-service`;
  const statusMessageId = `${formId}-status`;

  // Success state
  if (status === "success") {
    return (
      <div
        className={`rounded-2xl border border-green-200 bg-green-50 p-8 text-center ${className}`.trim()}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2
          className="mx-auto h-12 w-12 text-green-600 mb-4"
          aria-hidden="true"
        />
        <h3 className="text-xl font-semibold text-green-800 font-heading mb-2">
          Thank you!
        </h3>
        <p className="text-green-700">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`space-y-5 ${className}`.trim()}
      aria-label="Contact form"
    >
      {/* Honeypot field: visually hidden, screen-reader hidden, not focusable via tab */}
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
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

      {/* Name and Email side by side on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Name"
          type="text"
          name="name"
          required
          placeholder="Your name"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (fieldErrors.name) {
              setFieldErrors((prev) => ({ ...prev, name: undefined }));
            }
          }}
          error={fieldErrors.name}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) {
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          error={fieldErrors.email}
        />
      </div>

      {/* Phone and Service side by side on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Phone"
          type="tel"
          name="phone"
          placeholder="(555) 123-4567"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          hint="Optional"
        />

        {/* Service select: styled to match the Input component */}
        <div className="w-full">
          <label
            htmlFor={serviceSelectId}
            className="block text-sm font-medium text-text mb-1.5"
          >
            Service
          </label>
          <select
            id={serviceSelectId}
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={[
              "block w-full rounded-xl border px-4 py-3 text-base text-text",
              "bg-surface",
              "transition-all duration-150 appearance-none",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
              "border-border",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background",
              !service ? "text-text-muted/60" : "",
            ].join(" ")}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              paddingRight: "2.5rem",
            }}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-sm text-text-muted">Optional</p>
        </div>
      </div>

      <Textarea
        label="Message"
        name="message"
        required
        placeholder="How can we help you?"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          if (fieldErrors.message) {
            setFieldErrors((prev) => ({ ...prev, message: undefined }));
          }
        }}
        error={fieldErrors.message}
      />

      {/* Server error message */}
      {status === "error" && serverError && (
        <div
          id={statusMessageId}
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
          role="alert"
        >
          <AlertCircle
            className="h-5 w-5 text-red-600 mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <p className="text-sm text-red-700">{serverError}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
        size="md"
      >
        {status === "submitting" ? (
          <>
            <Loader2
              className="h-5 w-5 animate-spin"
              aria-hidden="true"
            />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
