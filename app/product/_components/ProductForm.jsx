"use client"
import { createProductAction, updateProductAction } from "../../actions/productActions"
import { BaseForm, InputField } from "../../components/shared/BaseForm"

export default function ProductForm({ defaultValues = {} }) {
    /**
     * Mode form ditentukan dari adanya ID
     */
    const isEdit = Boolean(defaultValues.id)

    const handleSubmit = async (data) => {
        /**
         * Casting & normalisasi data
         * (TANGGUNG JAWAB PARENT)
         */
        const payload = {
            name: data.nama,
            // price: Number(data.price),
            // stock: Number(data.stock),
            // categoryId: Number(data.categoryId),
            // active: data.active === 'on'
        }
        /**
        * Edit butuh ID
        */
        if (isEdit) {
            payload.id = defaultValues.id
            await updateProductAction(payload)
        } else {
            await createProductAction(payload)
        }
    }
    return (
        <BaseForm
            onSubmit={handleSubmit}
            buttonText={isEdit ? "Update Produk" : "Simpan Produk"}
        >
            <InputField
                label="Nama Produck"
                name="nama"
                defaultValue={defaultValues.nama}
            />
            {/* <InputField
                label="Harga"
                name="price"
                type="number"
                defaultValue={defaultValues.price}
                required
            />

            <InputField
                label="Stok"
                name="stock"
                type="number"
                defaultValue={defaultValues.stock}
                required
            />

            <SelectField
                label="Kategori"
                name="categoryId"
                options={[
                    { value: "1", label: "Makanan" },
                    { value: "2", label: "Minuman" }
                ]}
                defaultValue={defaultValues.categoryId}
                required
            />

            <CheckboxField
                label="Produk Aktif"
                name="active"
                defaultChecked={defaultValues.active}
            /> */}
        </BaseForm>
    )
}