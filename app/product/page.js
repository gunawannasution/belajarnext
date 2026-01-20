// ini memberitahu Next.js untuk tidak menyentuh database saat proses build, 
// melainkan baru mengambil data saat user membuka website (Runtime).
//tanpa ini pnpm run lint akan error
export const dynamic = "force-dynamic"; 

import { Plus } from "lucide-react"; // 2. Import ikon plus agar lebih keren
import Link from "next/link"; // 1. Import Link
import { DataTable } from "../../components/datatable";
import { getProducts } from "../services/productService";
import { columns } from "./_components/columns";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Container */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Daftar Produk
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola data produk Anda dengan mudah di sini.
          </p>
        </div>

        {/* Tombol Tambah Produk di Sisi Kanan */}
        <Link
          href="/product/new"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Produk</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4">
          <DataTable columns={columns} data={products} />
        </div>
      </div>
    </div>
  );
}
