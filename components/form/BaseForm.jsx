// Hanya Tiga tugas
// submit
// handle server response
// tampilkan toast

"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { z } from "zod";

export function BaseForm({
  action, // Server Action
  schema, // Zod schema
  submitLabel = "Simpan",
  successMessage = "Berhasil disimpan",
  children,
}) {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    // Validasi Zod
    if (schema) {
      const parseResult = schema.safeParse(values);
      if (!parseResult.success) {
        const firstError = Object.values(
          parseResult.error.flatten().fieldErrors
        )[0];
        toast.error(firstError?.[0] || "Data tidak valid");
        return;
      }
    }

    startTransition(async () => {
      try {
        const result = await action(formData);

        if (result?.success) {
          toast.success(successMessage);
        } else {
          toast.error(result?.message || "Terjadi kesalahan");
        }
      } catch (err) {
        toast.error(err.message || "Terjadi kesalahan server");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {children}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Menyimpan..." : submitLabel}
      </Button>
    </form>
  );
}
