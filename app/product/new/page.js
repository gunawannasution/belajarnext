import ProductForm from "../_components/ProductForm"

export default function createProduct() {
    return (
        <div className="mx-auto p-4">
            <h1>Tambah Produk</h1>
            <div className="mx-auto p-4 max-w-lg">
                <ProductForm />
            </div>
        </div>
    )
}