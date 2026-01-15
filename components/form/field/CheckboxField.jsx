"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "../FormField";
export function CheckboxField({
  name,
  label,
  defaultChecked = false,
  disabled = false,
  error,
  hint,
}) {
  return (
    <FormField name={name} error={error} hint={hint}>
      {({ pending }) => (
        <div className="flex items-center gap-2">
          <Checkbox
            id={name}
            name={name}
            defaultChecked={defaultChecked}
            disabled={disabled || pending}
          />
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
        </div>
      )}
    </FormField>
  );
}
