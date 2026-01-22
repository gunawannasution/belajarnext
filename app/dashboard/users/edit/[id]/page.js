// app/products/[id]/edit/page.js
import { UpdateUserAction } from "@/app/actions/usersActions";
import prisma from "@/app/lib/prisma";
import { BaseForm } from "@/components/form/BaseForm";
import { InputField } from "@/components/form/field";
import { notFound } from "next/navigation";

export default async function EditUserPage({ params }) {
  // 1. Await params sesuai standar Next.js 15
  const { id: rawId } = await params;
  const id = Number(rawId);

  // 2. Ambil data user dari database
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) notFound();

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Edit Profil User
        </h1>
        <p className="text-slate-500 mt-2 italic">
          ID Pengguna: #{user.id}
        </p>
      </div>

      <BaseForm
        // Menggunakan bind agar ID aman terkirim ke Server Action
        action={UpdateUserAction.bind(null, user.id)}
        submitLabel="Simpan Perubahan"
        successMessage="Data user berhasil diperbarui"
      >
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-4 space-y-4">
          <InputField
            name="name"
            label="Nama Lengkap"
            defaultValue={user.name}
            required
          />
          <InputField
            name="email"
            label="Alamat Email"
            type="email"
            defaultValue={user.email}
            required
          />

          {/* Password dikosongkan demi keamanan (Best Practice 2026) */}
          <InputField
            name="password"
            label="Ganti Password"
            type="password"
            placeholder="Biarkan kosong jika tidak ingin diubah"
          />

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              Hak Akses (Role)
            </label>
            <select 
              name="role"
              // PERBAIKAN: Gunakan defaultValue agar role lama terpilih otomatis
              defaultValue={user.role} 
              className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer hover:border-slate-300"
            >
              <option value="USER">User (Standard)</option>
              <option value="ADMIN">Admin (Full Access)</option>
            </select>
            <p className="text-[10px] text-slate-400 ml-1 italic">
              * Perubahan role akan mempengaruhi hak akses sistem.
            </p>
          </div>
        </div>
      </BaseForm>
    </div>
  );
}
