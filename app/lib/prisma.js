import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import mysql from "mysql2/promise";
import "server-only";

const connectionString = process.env.DATABASE_URL;

// Letakkan pool di luar singleton agar tetap satu instance
const pool = mysql.createPool({
  uri: connectionString,
  connectionLimit: 10,
  connectTimeout: 20000, // Tambah waktu timeout jadi 20 detik
});

const prismaClientSingleton = () => {
  const adapter = new PrismaMariaDb(pool);
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
