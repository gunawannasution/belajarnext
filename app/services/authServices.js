import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "USER",
    },
  });
}


// FUNGSI BARU: Untuk validasi Login
export async function verifyUserCredentials(email, password) {
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "Email tidak terdaftar" };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return { error: "Password salah" };
  }

  // Jika benar, kembalikan data user tanpa password (keamanan)
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword };
}