"use client";

import { Textarea } from "@/components/ui/textarea";
import { FormField } from "../FormField";

export function TextareaField({ name, label, defaultValue, error, required }) {
  return (
    <FormField label={label} error={error}>
      <Textarea name={name} defaultValue={defaultValue} required={required} />
    </FormField>
  );
}
