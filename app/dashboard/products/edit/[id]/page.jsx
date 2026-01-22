// app/products/[id]/edit/page.js
import { BaseForm } from "@/components/form/BaseForm";
import { InputField } from "@/components/form/field";
import { updateProductAction } from "@/app/actions/productActions";
import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation"; // Import untuk handling 404

export default async function EditProductPage({ params }) {
  // 1. Await params (Standar Next.js 15/2026)
  const resolvedParams = await params;

  // 2. Konversi ID ke Angka
  const id = Number(resolvedParams.id);

  // 3. Query Prisma
  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  // Jika produk tidak ada, tampilkan halaman 404 standar Next.js
  if (!product) notFound();

  return (
    // Menggunakan container mx-auto agar lebar sekitar 80% dan responsif
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Edit Produk
        </h1>
        <p className="text-slate-500 mt-2">
          Perbarui informasi produk ID #{product.id} dengan benar.
        </p>
      </div>

      {/* Form dengan ID yang sudah di-bind ke Action */}
      <BaseForm
        action={updateProductAction.bind(null, product.id)}
        submitLabel="Simpan Perubahan"
        successMessage="Produk berhasil diperbarui"
      >
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
          <InputField
            name="nama"
            label="Nama Produk"
            defaultValue={product.nama}
            placeholder="Masukkan nama produk baru..."
          />
        </div>
      </BaseForm>
    </div>
  );
}
