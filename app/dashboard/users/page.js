// app/product/page.js
export const dynamic = "force-dynamic";

import { Plus } from "lucide-react";
import { cookies } from "next/headers"; // 1. Tambahkan import cookies
import Link from "next/link";
import { DataTable } from "../../../components/datatable";
import { getUser } from "../../services/usersServices";
import { columns } from "./_components/columns";

export default async function UserPage() {
  //ambil data
  const users = await getUser()

  // 2. Ambil data session dari cookies
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Container */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            DATA USERS
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola data produk Anda dengan mudah di sini.
          </p>
        </div>

        <Link
          href="/dashboard/users/new"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Produk</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4">
          {/* Kirim Data Ke Table dan instruksi kolom apa yang tampil di table */}
          <DataTable columns={columns} data={users} />
        </div>
      </div>
    </div>
  );
}
