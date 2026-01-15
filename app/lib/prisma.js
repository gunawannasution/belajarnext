import "server-only";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "server-only";
const prismaClientSingleton = () => {
  // Ambil URL dari .env
  const url = process.env.DATABASE_URL;

  // PENTING: Masukkan url ke dalam constructor adapter
  const adapter = new PrismaMariaDb(url);

  return new PrismaClient({
    adapter,
    // Tambahkan log untuk melihat jika ada kendala koneksi di terminal
    log: ["query", "error", "warn"],
  });
};

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
