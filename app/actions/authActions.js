"use server";

import { revalidatePath } from "next/cache";
import { createUser, getUserByEmail, verifyUserCredentials } from "../services/authServices";

export async function registerAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  if (!name || !email || !password) {
    return { success: false, message: "Data tidak lengkap" };
  }

  try {
    const existing = await getUserByEmail(email);
    if (existing) return { success: false, message: "Email sudah terdaftar" };

    await createUser({ name, email, password, role });

    revalidatePath("/login");
    return { success: true };
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return { success: false, message: "Terjadi kesalahan pendaftaran" };
  }
}

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { success: false, message: "Email dan password wajib diisi" };
  }

  try {
    const result = await verifyUserCredentials(email, password);

    if (result.error) {
      return { success: false, message: result.error };
    }

    // LOGIN BERHASIL
    // Di Next.js 2026, di sini Anda biasanya akan mengatur cookie session
    // atau memanggil signIn() jika menggunakan Auth.js
    
    return { success: true };
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}