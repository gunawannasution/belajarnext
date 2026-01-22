"use client";

import { deleteUsersAction } from "@/app/actions/usersActions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

/**
 * Komponen tombol hapus user dengan konfirmasi Toast
 */
//menerima user id dari column.js untuk di delete
//pastikan sama dengan <DeleteUsersButton userId={user.id} />
export function DeleteUsersButton({ userId }) {
  // useTransition digunakan untuk handle loading state pada Server Action
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // 1. Munculkan toast peringatan
    toast.warning("Hapus user ini?", {
      description: "Tindakan ini tidak bisa dibatalkan.",
      action: {
        label: "Hapus",
        onClick: () =>
          // 2. Bungkus proses async dengan startTransition
          startTransition(async () => {
            try {
              const result = await deleteUsersAction(userId);

              if (!result.success) {
                throw new Error(result.message);
              }

              toast.success("User berhasil dihapus");
              // Catatan: router.refresh() seringkali tidak perlu jika Action sudah revalidatePath
            } catch (error) {
              toast.error(error?.message || "Gagal menghapus user");
            }
          }),
      },
    });
  };

  return (
    <Button
      size="sm"
      variant="destructive"
      disabled={isPending} // Tombol mati saat proses hapus berjalan
      onClick={handleDelete}
    >
      {isPending ? "Menghapus..." : "Hapus"}
    </Button>
  );
}
