"use client";

import { Button } from "@/components/ui/button";
import { Loader2, SendHorizontal, X } from "lucide-react"; // Tambah ikon X
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function BaseForm({
  action,
  submitLabel = "Simpan",
  successMessage = "Berhasil disimpan",
  redirectTo = "/", // 1. Tambahkan prop baru dengan default value

  children,
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await action(formData);

        if (result?.success) {
          toast.success(successMessage);
          setTimeout(() => {
            router.push(redirectTo);
            router.refresh();
          }, 1000);
        } else {
          toast.error(result?.message || "Terjadi kesalahan");
        }
      } catch (err) {
        toast.error("Terjadi kesalahan server");
      }
    });
  }

  return (
    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xl shadow-slate-100/50 max-w-lg mx-auto transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">{children}</div>

        {/* Container untuk Tombol Group */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Tombol Batal - Muncul di sebelah kiri pada desktop */}
          <Button
            type="button" // Wajib type="button" agar tidak men-submit form
            variant="outline"
            disabled={isPending}
            onClick={() => router.back()} // Kembali ke halaman sebelumnya
            className="flex-1 h-11 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 opacity-70" />
              <span>Batal</span>
            </div>
          </Button>

          {/* Tombol Simpan */}
          <Button
            type="submit"
            disabled={isPending}
            className={`flex-2 h-11 text-base font-medium transition-all active:scale-[0.98] ${
              isPending
                ? "bg-slate-400 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200"
            }`}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Memproses...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>{submitLabel}</span>
                <SendHorizontal className="h-4 w-4 opacity-80" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
