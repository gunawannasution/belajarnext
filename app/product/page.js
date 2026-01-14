// app/product/page.jsx
import prisma from "../lib/prisma"
import { Table } from "../components/shared/Table"
import { Button } from "../components/shared/Button"
import Link from "next/link"
import { revalidatePath } from "next/cache"

export default async function ProductPage() {
    // 1. Ambil data produk
    const products = await prisma.product.findMany({
        orderBy: { id: "asc" },
    })

    // 2. Fungsi Hapus (Server Action)
    async function deleteProduct(formData) {
        "use server"
        const id = formData.get("id")
        await prisma.product.delete({
            where: { id: Number(id) }
        })
        revalidatePath("/product") // Refresh data otomatis setelah hapus
    }

    const columns = [
        { key: "nama", label: "Nama Produk" },
        {
            key: "createdAt",
            label: "Dibuat",
            render: (row) => new Date(row.createdAt).toLocaleDateString("id-ID"),
        },
        {
            key: "action",
            label: "Aksi",
            render: (row) => (
                <div className="flex gap-2">
                    {/* Pastikan path sesuai folder: /edit/[id] */}
                    <Link href={`/product/edit/${row.id}`}>
                        <Button size="sm">Edit</Button>
                    </Link>

                    {/* Form kecil untuk fungsi hapus */}
                    <form action={deleteProduct}>
                        <input type="hidden" name="id" value={row.id} />
                        <Button size="sm" variant="danger" type="submit">
                            Hapus
                        </Button>
                    </form>
                </div>
            ),
        },
    ]

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Daftar Produk</h1>
                <Link href="/product/new">
                    <Button>+ Tambah Produk</Button>
                </Link>
            </div>

            <Table columns={columns} data={products} />
        </div>
    )
}
