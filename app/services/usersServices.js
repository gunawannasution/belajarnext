import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

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

export async function createUser(data) {
  // 1. Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  try {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword, // GUNAKAN hasil hash, bukan data.password!
        role: data.role || "USER"
      }
    });
  } catch (error) {
    console.error("Service Error (Tambah User):", error);
    throw new Error("Gagal menambah user");
  }
}

export async function deleteUsers(id) {
  // Pastikan ID dikonversi ke angka jika schema Anda menggunakan Int
  const numericId = Number(id);

  if (isNaN(numericId)) {
    throw new Error("ID tidak valid");
  }

  try {
    // Gunakan 'user' (singular), bukan 'users' (plural) sesuai standar Prisma
    return await prisma.user.delete({
      where: { id: numericId },
    });
  } catch (error) {
    console.error("Service Error (Delete User):", error);
    throw new Error("Gagal menghapus User");
  }
}
