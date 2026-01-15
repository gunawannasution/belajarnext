"use client";

import { Input } from "@/components/ui/input";
import { FormField } from "../FormField";

export function InputField({ name, label, defaultValue, error, required }) {
  return (
    <FormField label={label} error={error}>
      <Input name={name} defaultValue={defaultValue} required={required} />
    </FormField>
  );
}
