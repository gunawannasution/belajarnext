"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteProductAction } from "../../actions/productActions";

export function DeleteProductButton({ productId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    toast.warning("Hapus produk ini?", {
      description: "Tindakan ini tidak bisa dibatalkan.",
      action: {
        label: isPending ? "Menghapus..." : "Hapus",
        onClick: () =>
          startTransition(async () => {
            try {
              const result = await deleteProductAction(productId);

              if (result?.success === false) {
                throw new Error(result.message);
              }

              toast.success("Produk berhasil dihapus");
              router.refresh();
            } catch (error) {
              toast.error(error?.message || "Gagal menghapus produk");
            }
          }),
      },
    });
  };

  return (
    <Button
      size="sm"
      variant="destructive"
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? "Menghapus..." : "Hapus"}
    </Button>
  );
}
