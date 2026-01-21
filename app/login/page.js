// app/login/page.js
import { loginAction } from "@/app/actions/authActions";
import { BaseForm } from "@/components/form/BaseForm";
import { InputField } from "@/components/form/field";
import { cookies } from "next/headers"; // 1. Import cookies
import { redirect } from "next/navigation"; // 2. Import redirect

export default async function LoginPage() {
  // 3. Cek apakah ada session di cookie (Server Side)
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  // 4. Jika sudah login, langsung lempar ke halaman product
  // User tidak akan bisa melihat form login ini lagi selama session aktif
  if (session) {
    redirect("/product");
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="max-w-lg mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Selamat Datang
        </h1>
        <p className="text-slate-500 mt-2">
          Masuk untuk mengelola inventaris Anda
        </p>
      </div>

      <BaseForm 
        action={loginAction} 
        submitLabel="Masuk Sekarang"
        successMessage="Login berhasil! Mengalihkan..."
      >
        <div className="space-y-4 bg-white p-8 rounded-2xl border shadow-sm border-slate-100">
          <InputField 
            name="email" 
            label="Email" 
            type="email" 
            placeholder="nama@contoh.com"
            required 
          />
          <InputField 
            name="password" 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            required 
          />
          
        </div>
      </BaseForm>
    </div>
  );
}
