"use server"
// ↑ Directive WAJIB untuk menandai bahwa file / fungsi ini
//   dieksekusi di SERVER (bukan browser).
//   Tanpa ini, Next.js bisa menganggapnya client dan akan error
//   saat ada Prisma / revalidatePath.

import { revalidatePath } from "next/cache"
// ↑ Digunakan untuk menghapus cache halaman tertentu
//   setelah terjadi perubahan data (create / update / delete)

import { createProduct } from "../services/productService"
// ↑ Import service layer
//   Action TIDAK langsung bicara ke Prisma
//   Ini menjaga pemisahan tanggung jawab (best practice)

export async function createProductAction(payload) {
    /**
     * payload = data mentah dari Client Component (form)
     * Contoh payload:
     * { name: "Produk A" }
     *
     * Di sini kita TIDAK percaya penuh payload,
     * jadi kita ambil field yang kita butuhkan saja.
     */
    const { name } = payload

    /**
     * Validasi minimal di level action
     * (bukan error handling kompleks, hanya penjagaan kontrak)
     */
    if (!name) {
        return {
            success: false,
            message: "Nama produk wajib diisi"
        }
    }

    /**
     * Mapping UI → domain/database
     *
     * UI pakai: name
     * Database pakai: nama
     *
     * Mapping eksplisit ini:
     * - membuat UI tidak tergantung schema DB
     * - memudahkan refactor di masa depan
     */
    const product = await createProduct({
        nama: name
    })

    /**
     * Invalidate cache halaman /product
     * agar data terbaru muncul setelah insert
     */
    revalidatePath("/product")

    /**
     * Return contract ke client
     * UI tidak perlu tahu detail Prisma,
     * cukup tahu operasi berhasil atau tidak
     */
    return {
        success: true,
        data: product
    }
}

/*
 * ============================================================
 * EDIT PRODUCT
 * ============================================================
*/

export async function updateProductAction(payload) {
    /**
     * payload dari client
     * Contoh:
     * {
     *   id: 1,
     *   name: "Produk B"
     * }
     */
    const { id, name } = payload

    /**
     * Validasi kontrak
     */
    if (!id) {
        return {
            success: false,
            message: "ID produk wajib ada"
        }
    }

    if (!name) {
        return {
            success: false,
            message: "Nama produk wajib diisi"
        }
    }

    /**
     * Mapping UI → domain/database
     */
    const product = await updateProduct(Number(id), {
        nama: name
    })

    /**
     * Invalidate cache
     */
    revalidatePath("/product")

    /**
     * Return contract ke client
     */
    return {
        success: true,
        data: product
    }
}
