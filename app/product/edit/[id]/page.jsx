// /app/edit/[id]/page.jsx
import prisma from "../../../lib/prisma"
import ProductForm from "../../_components/ProductForm"
import { notFound } from "next/navigation"

export default async function EditProductPage({ params }) {
    // 1. Di Next.js terbaru (2026), params harus di-await
    const { id } = await params

    // 2. Ambil data dari database
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    })

    // 3. Jika tidak ada, arahkan ke halaman 404 standar Next.js
    if (!product) {
        notFound()
    }

    // 4. Siapkan data untuk dikirim ke form (Sesuaikan key dengan 'name' di form)
    const initialData = {
        id: product.id,
        nama: product.nama,
        // tambahkan field lain jika ada, misal: harga: product.harga
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-semibold mb-4">Edit Produk</h1>
            {/* 5. Pastikan variabel yang dikirim sama dengan yang didefinisikan */}
            <ProductForm defaultValues={initialData} />
        </div>
    )
}
