"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    header: "Aksi",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href={`/product/edit/${product.id}`}>Edit</Link>
          </Button>

          <DeleteProductButton productId={product.id} />
        </div>
      );
    },
  },
];
