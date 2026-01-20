// app/login/page.js
import { loginAction } from "@/app/actions/authActions";
import { BaseForm } from "@/components/form/BaseForm";
import { InputField } from "@/components/form/field";

export default function LoginPage() {
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="max-w-lg mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Selamat Datang</h1>
        <p className="text-slate-500 mt-2">Masuk untuk mengelola inventaris Anda</p>
      </div>

      <BaseForm 
        action={loginAction} 
        submitLabel="Masuk Sekarang"
        successMessage="Login berhasil! Mengalihkan..."
      >
        <div className="space-y-4 bg-white p-8 rounded-2xl border shadow-sm">
          <InputField name="email" label="Email" type="email" required />
          <InputField name="password" label="Password" type="password" required />
        </div>
      </BaseForm>
    </div>
  );
}
