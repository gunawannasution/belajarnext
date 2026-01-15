"use client";

import { FormField } from "../FormField";

export function FileField({
  name,
  label,
  accept,
  required = false,
  disabled = false,
  error,
  hint,
}) {
  return (
    <FormField name={name} label={label} error={error} hint={hint}>
      {({ pending, hasError }) => (
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          required={required}
          disabled={disabled || pending}
          aria-invalid={hasError}
        />
      )}
    </FormField>
  );
}
