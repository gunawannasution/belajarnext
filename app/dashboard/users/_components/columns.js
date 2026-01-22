"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteUsersButton } from "./DeleteUsersButton";

export const columns = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey:"email",
    header:"Email"
  },
  {
    accessorKey:"role",
    header:"Role"
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    // 1. Membuat Header dan teks rata kanan menggunakan fungsi anonim () =>
    header: () => <div className="text-right">Aksi</div>,
    //untuk Menentukan apa yang akan ditampilkan di setiap baris pada kolom tersebut.
    //Sebagai tempat untuk menaruh logika atau komponen interaktif (seperti tombol Edit/Delete)
    cell: ({ row }) => {
      // Ambil data user asli (data mentah)
      const user = row.original;

      return (
        // 2. Membuat container tombol rata kanan (justify-end)
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" asChild className="h-8">
            <Link href={`/dashboard/users/edit/${user.id}`}>Edit</Link>
          </Button>

          <DeleteUsersButton userId={user.id} />
        </div>
      );
    },
  },
];
