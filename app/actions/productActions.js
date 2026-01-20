"use server";

import { revalidatePath } from "next/cache";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  // Asumsi ada fungsi findProductByName untuk validasi duplikat
  getProductByName,
} from "../services/productService";

// Helper yang konsisten
const success = (data) => ({ success: true, data });
const failure = (message) => ({ success: false, message });

export async function createProductAction(formData) {
  const nama = formData.get("nama")?.toString().trim();

  // 1. Validasi Input Lebih Ketat
  if (!nama || nama.length < 3) {
    return failure("Nama produk minimal 3 karakter");
  }

  try {
    // 2. Cek Duplikasi (Sangat penting agar DB tidak kotor)
    // const existing = await getProductByName(nama);
    // if (existing) return failure("Produk dengan nama tersebut sudah ada");

    const product = await createProduct({ nama });

    // 3. Revalidate Path agar data di client langsung sinkron
    revalidatePath("/product");
    return success(product);
  } catch (error) {
    console.error("[CREATE_PRODUCT_ERROR]:", error);
    return failure("Gagal menyimpan produk ke sistem");
  }
}

export async function updateProductAction(id, formData) {
  const nama = formData.get("nama")?.toString().trim();

  // Pastikan ID dikonversi ke Number jika DB Anda menggunakan integer
  const numericId = Number(id);

  if (!numericId || !nama || nama.length < 3) {
    return failure("ID tidak valid atau nama terlalu pendek");
  }

  try {
    const product = await updateProduct(numericId, { nama });

    // Revalidate halaman list dan halaman detail produk (jika ada)
    revalidatePath("/product");
    revalidatePath(`/product/${numericId}/edit`);

    return success(product);
  } catch (error) {
    console.error("[UPDATE_PRODUCT_ERROR]:", error);
    return failure("Gagal memperbarui informasi produk");
  }
}

export async function deleteProductAction(id) {
  const numericId = Number(id);

  if (!numericId) return failure("ID produk tidak valid");

  try {
    await deleteProduct(numericId);

    revalidatePath("/product");
    return success();
  } catch (error) {
    console.error("[DELETE_PRODUCT_ERROR]:", error);
    return failure("Produk tidak bisa dihapus atau tidak ditemukan");
  }
}
