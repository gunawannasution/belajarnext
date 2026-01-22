// app/product/create/page.js
import { createProductAction } from "@/app/actions/productActions";
import { BaseForm } from "@/components/form/BaseForm";
import { InputField } from "@/components/form/field";

export default function CreateProductPage() {
  return (
    // Menggunakan container mx-auto py-12 agar konsisten dengan halaman Daftar & Edit
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section yang simetris dengan gaya halaman Edit */}
      <div className="max-w-lg mx-auto mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Tambah Produk
        </h1>
        <p className="text-slate-500 mt-2">
          Silahkan lengkapi detail produk baru Anda di bawah ini.
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-lg mx-auto">
        <BaseForm
          action={createProductAction}
          submitLabel="Tambah Produk"
          successMessage="Produk baru berhasil ditambahkan!"
          redirectTo="/dashboard/products"
        >
          {/* Card pembungkus input agar terlihat lebih rapi dan "clean" */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-2">
            <InputField
              name="nama"
              label="Nama Produk"
              placeholder="Contoh: Sepatu Lari Pro"
              required
            />
          </div>
        </BaseForm>
      </div>
    </div>
  );
}
