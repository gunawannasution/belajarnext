"use client";

import { logoutAction } from "@/app/actions/authActions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logoutAction();
      
      if (result.success) {
        toast.success("Berhasil keluar");
        router.push("/login");
        router.refresh(); // Pastikan state aplikasi bersih
      } else {
        toast.error("Gagal keluar sistem");
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-95 disabled:opacity-50"
    >
      <LogOut className={`h-4 w-4 ${isPending ? "animate-pulse" : ""}`} />
      <span>{isPending ? "Keluar..." : "Logout"}</span>
    </button>
  );
}
