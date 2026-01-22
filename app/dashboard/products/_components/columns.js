"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteProductButton } from "./DeleteProductButton";

export const columns = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    // 1. Membuat Header teks rata kanan
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const product = row.original;

      return (
        // 2. Membuat container tombol rata kanan (justify-end)
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" asChild className="h-8">
            <Link href={`/dashboard/products/edit/${product.id}`}>Edit</Link>
          </Button>

          <DeleteProductButton productId={product.id} />
        </div>
      );
    },
  },
];
