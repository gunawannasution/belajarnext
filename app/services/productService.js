import prisma from "../lib/prisma"

/*
 * ============================================================
 * CREATE PRODUCT SERVICE
 * ============================================================
*/
export async function createProduct(data) {
    await prisma.product.create({ data })
}


/*
 * ============================================================
 * CREATE PRODUCT SERVICE
 * ============================================================
*/
export async function updateProduct(id, data) {
    return prisma.product.update({
        where: { id },
        data
    })
}