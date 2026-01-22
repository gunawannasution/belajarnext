"use server";

import { revalidatePath } from "next/cache";
import { createUser, deleteUsers } from "../services/usersServices";

/**
 * Helper Standar Response
 * Memudahkan frontend menangani hasil tanpa try-catch berulang
 */
const success = (data) => ({ success: true, data });
const failure = (message) => ({ success: false, message });

/**
 * Action untuk Membuat User Baru
 * @param {FormData} formData - Data dari form HTML
 */
export async function CreateUserAction(formData) {
  // 1. Ekstraksi data dari FormData
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  // Validasi dasar sebelum ke database
  if (!name || !email || !password) return failure("Data tidak lengkap");

  try {
    const user = await createUser({ name, email, password, role });
    
    // 2. Refresh data di halaman users agar langsung muncul yang baru
    revalidatePath("/users"); 
    return success(user);
  } catch (error) {
    console.error("[CREATE_USER_ACTION_ERROR]:", error);
    return failure("Gagal menyimpan user ke sistem");
  }
}

/**
 * Action untuk Update User
 * @param {number} id - ID User yang diupdate
 * @param {FormData} formData - Data baru dari form
 */
export async function UpdateUserAction(id, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const role = formData.get("role");
  const password = formData.get("password");

  // Siapkan data yang akan diupdate
  const updateData = { name, email, role };

  // HANYA update password jika user mengisi kotak password
  if (password && password.trim() !== "") {
    const bcrypt = await import("bcryptjs");
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    await prisma.user.update({
      where: { id: Number(id) },
      data: updateData
    });
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal update" };
  }
}



/**
 * Action untuk Menghapus User
 * @param {number|string} id - ID User yang akan dihapus
 */
export async function deleteUsersAction(id) {
  // 1. Konversi ID ke angka
  const numericId = parseInt(id);

  // 2. Validasi apakah hasil konversi valid
  if (isNaN(numericId) || numericId <= 0) {
    return failure("ID user tidak valid (Harus berupa angka)");
  }

  try {
    await deleteUsers(numericId);
    revalidatePath("/users");
    return success();
  } catch (error) {
    return failure("User gagal dihapus");
  }
}
