"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createUser, getUserByEmail, verifyUserCredentials } from "../services/authServices";

/**
 * ACTION: Registrasi User Baru
 */
export async function registerAction(formData) {
  // Mengambil data dari input form berdasarkan atribut 'name'
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  // Validasi dasar di sisi server (Security: Jangan percaya data client)
  if (!name || !email || !password) {
    return { success: false, message: "Data tidak lengkap" };
  }

  try {
    // Memastikan email unik (belum ada di database)
    const existing = await getUserByEmail(email);
    if (existing) return { success: false, message: "Email sudah terdaftar" };

    // Memanggil service untuk proses hashing password dan simpan ke database
    await createUser({ name, email, password, role });

    // Membersihkan cache halaman login agar data terbaru tersinkronisasi
    revalidatePath("/login");
    return { success: true };
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return { success: false, message: "Terjadi kesalahan pendaftaran" };
  }
}

/**
 * ACTION: Login User
 */
export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Validasi input kosong
  if (!email || !password) {
    return { success: false, message: "Email dan password wajib diisi" };
  }

  try {
    // Memanggil service untuk verifikasi email & kecocokan password (bcrypt.compare)
    const result = await verifyUserCredentials(email, password);

    // Jika service mengembalikan pesan error (email tak ada/password salah)
    if (result.error) {
      return { success: false, message: result.error };
    }

    // Jika user ditemukan dan password cocok
    if (result.user) {
      const cookieStore = await cookies();
      
      // Membuat Cookie Session (Next.js 15+ menggunakan await pada cookies)
      cookieStore.set("session", JSON.stringify(result.user), {
        httpOnly: true, // Keamanan: Cookie tidak bisa dibaca oleh JavaScript (mencegah XSS)
        secure: process.env.NODE_ENV === "production", // Hanya kirim lewat HTTPS saat di production
        maxAge: 60 * 60 * 24, // Masa berlaku cookie (1 hari dalam detik)
        path: "/", // Cookie berlaku di seluruh halaman aplikasi
        sameSite: "lax", // Keamanan: Mencegah serangan CSRF
      });

      return { success: true };
    }
    
    return { success: false, message: "Login gagal" };
    
  } catch (error) {
    // Logging error asli ke server terminal untuk debugging
    console.error("[LOGIN_ERROR]", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}


/**
 * ACTION: Logout User
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  
  // Menghapus cookie session
  cookieStore.delete("session");
  
  // Membersihkan cache rute terproteksi agar data tidak tersisa di browser
  revalidatePath("/");
  
  // Redirect ke halaman login setelah logout berhasil
  return { success: true };
}
