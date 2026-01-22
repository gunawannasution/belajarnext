import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

/**
 * Ambil semua user dari database
 */
export async function getUser() {
  try {
    return await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Service Error (Get User):", error);
    return [];
  }
}

/**
 * Logika penambahan user ke database
 */
export async function createUser(data) {
  // 1. Enkripsi password menggunakan bcrypt (Standar Keamanan)
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  try {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword, // Simpan password yang sudah di-hash
        role: data.role || "USER"
      }
    });
  } catch (error) {
    console.error("Service Error (Create User):", error);
    throw new Error("Email mungkin sudah terdaftar");
  }
}


/**
 * Update Data User ke Database
 */
export async function updateUser(id, data) {
  const numericId = Number(id);
  
  try {
    // Jika ada password baru, hash dulu. Jika kosong, jangan update password.
    const updateData = {
      name: data.name,
      email: data.email,
      role: data.role,
    };

    if (data.password) {
      const bcrypt = await import("bcryptjs");
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return await prisma.user.update({
      where: { id: numericId },
      data: updateData,
    });
  } catch (error) {
    console.error("Service Error (Update User):", error);
    throw new Error("Gagal memperbarui data user");
  }
}


/**
 * Logika penghapusan user
 */
export async function deleteUsers(id) {
  const numericId = Number(id);

  try {
    // Prisma menggunakan nama model singular (user), bukan plural
    return await prisma.user.delete({
      where: { id: numericId },
    });
  } catch (error) {
    console.error("Service Error (Delete User):", error);
    throw new Error("Gagal menghapus user dari database");
  }
}
