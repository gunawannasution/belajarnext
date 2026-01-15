"use client";

import { Label } from "@/components/ui/label";

export function FormField({ label, error, children }) {
  return (
    <div className="space-y-1">
      {label && <Label>{label}</Label>}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
