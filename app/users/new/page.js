import { CreateUserActions } from "@/app/actions/usersActions";
import { BaseForm } from "@/components/form/BaseForm";
import { InputField } from "@/components/form/field";

export default function CreateUserPage(){
  return(
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-lg mx-auto mb-8">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
      Tambah User
      </h1>
        <p className="text-slate-500 mb-2"> Tambah user disini</p>
      </div>
      <div>
        <BaseForm action={CreateUserActions} submitLabel="Tambah User" successMessage="Berhasil tambah user" redirectTo="/users">
        <div>
        <InputField
          name="name"
          label="Nama User"
          placeholder="Gunawan Nasution"
          required
        />
        <InputField
          name="email"
          label="Email User"
          placeholder="gunawan@gmail.com"
          required
        />

        <InputField
          name="password"
          label="Password"
          placeholder="*******"
          required
        />
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
    </div>
  )
}