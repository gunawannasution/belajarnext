"use client";

import { Select, SelectItem } from "@/components/ui/select";
import { FormField } from "./FormField";

export function SelectField({
  name,
  label,
  options,
  defaultValue,
  error,
  required,
}) {
  return (
    <FormField label={label} error={error}>
      <Select name={name} defaultValue={defaultValue} required={required}>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    </FormField>
  );
}
