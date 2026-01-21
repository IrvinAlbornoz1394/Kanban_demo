import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={htmlFor} style={{ fontWeight: 500, display: "block", marginBottom: 4 }}>
        {label}
      </label>
      {children}
      {error && (
        <div style={{ color: "#d32f2f", fontSize: "0.9em", marginTop: 2 }}>
          {error}
        </div>
      )}
    </div>
  );
}