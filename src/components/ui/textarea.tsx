"use client";

import { type TextareaHTMLAttributes, useId, forwardRef } from "react";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  /** Visible label for the textarea */
  label: string;
  /** Error message to display below the textarea */
  error?: string;
  /** Hint text displayed below the textarea */
  hint?: string;
  /** Override the auto-generated id */
  id?: string;
  /** Additional classes for the outermost wrapper */
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, hint, id: customId, required, className = "", ...rest },
    ref,
  ) {
    const generatedId = useId();
    const textareaId = customId ?? generatedId;
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint ? `${textareaId}-hint` : undefined;

    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={`w-full ${className}`.trim()}>
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-text mb-1.5"
        >
          {label}
          {required && (
            <span className="text-red-600 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          rows={rest.rows ?? 4}
          className={[
            "block w-full rounded-xl border px-4 py-3 text-base text-text",
            "bg-surface placeholder:text-text-muted/60",
            "transition-all duration-150 resize-y min-h-[120px]",
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
