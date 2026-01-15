import prisma from "../lib/prisma";

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(data) {
  return await prisma.product.create({ data });
}

export async function updateProduct(id, data) {
  return await prisma.product.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deleteProduct(id) {
  try {
    return await prisma.product.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.error("Service Error (deleteProduct):", error);
    throw new Error("Gagal menghapus produk");
  }
}
