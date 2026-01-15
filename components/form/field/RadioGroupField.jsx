"use client";

import { FormField } from "../FormField";

export function RadioGroupField({
  name,
  label,
  options = [],
  defaultValue,
  disabled = false,
  error,
  hint,
}) {
  return (
    <FormField name={name} label={label} error={error} hint={hint}>
      {({ pending }) => (
        <div className="space-y-2">
          {options.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="radio"
                name={name}
                value={opt.value}
                defaultChecked={opt.value === defaultValue}
                disabled={disabled || pending}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </FormField>
  );
}
