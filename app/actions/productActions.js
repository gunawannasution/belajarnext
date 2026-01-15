"use server";

import { revalidatePath } from "next/cache";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

function success(data) {
  return { success: true, data };
}

function failure(message) {
  return { success: false, message };
}

export async function createProductAction(formData) {
  const nama = formData.get("nama");

  if (!nama || !nama.trim()) {
    return failure("Nama produk wajib diisi");
  }

  try {
    const product = await createProduct({
      nama: nama.trim(),
    });

    revalidatePath("/product");
    return success(product);
  } catch (error) {
    console.error("[CREATE_PRODUCT]", error);
    return failure("Gagal menyimpan produk");
  }
}

export async function updateProductAction(formData) {
  const id = Number(formData.get("id"));
  const nama = formData.get("nama");

  if (!id || !nama || !nama.trim()) {
    return failure("ID dan nama wajib diisi");
  }

  try {
    const product = await updateProduct(id, {
      nama: nama.trim(),
    });

    revalidatePath("/product");
    return success(product);
  } catch (error) {
    console.error("[UPDATE_PRODUCT]", error);
    return failure("Gagal memperbarui produk");
  }
}

export async function deleteProductAction(id) {
  try {
    await deleteProduct(Number(id));
    revalidatePath("/product");
    return success();
  } catch (error) {
    console.error("[DELETE_PRODUCT]", error);
    return failure("Gagal menghapus produk");
  }
}
