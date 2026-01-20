import { BaseForm } from "@/components/form/BaseForm";
import { InputField } from "@/components/form/field";
import { registerAction } from "../actions/authActions";

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-lg mx-auto mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Buat Akun Baru</h1>
        <p className="text-slate-500 mt-2">Daftar untuk mulai mengelola inventaris Anda.</p>
      </div>

      <BaseForm 
        action={registerAction} 
        submitLabel="Daftar Sekarang"
        successMessage="Akun berhasil dibuat! Silahkan login."
      >
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
          <InputField name="name" label="Nama Lengkap" placeholder="John Doe" required />
          <InputField name="email" label="Email" type="email" placeholder="john@example.com" required />
          <InputField name="password" label="Password" type="password" placeholder="••••••••" required />
          
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Role</label>
            <select 
              name="role" 
              className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              <option value="USER">User (Standard)</option>
              <option value="ADMIN">Admin (Akses Penuh)</option>
            </select>
          </div>
        </div>
      </BaseForm>
    </div>
  );
}
