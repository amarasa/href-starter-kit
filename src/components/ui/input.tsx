"use client";

import { type InputHTMLAttributes, useId, forwardRef } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  /** Visible label for the input */
  label: string;
  /** Error message to display below the input */
  error?: string;
  /** Hint text displayed below the input */
  hint?: string;
  /** Override the auto-generated id */
  id?: string;
  /** Additional classes for the outermost wrapper */
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, error, hint, id: customId, required, className = "", ...rest },
    ref,
  ) {
    const generatedId = useId();
    const inputId = customId ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={`w-full ${className}`.trim()}>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text mb-1.5"
        >
          {label}
          {required && (
            <span className="text-red-600 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={[
            "block w-full rounded-xl border px-4 py-3 text-base text-text",
            "bg-surface placeholder:text-text-muted/60",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
            error
              ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
              : "border-border",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background",
          ].join(" ")}
          {...rest}
        />

        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  },
);
