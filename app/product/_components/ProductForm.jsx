import { BaseForm } from "@/components/form/BaseForm";
import { InputField } from "@/components/form/field";
import { createProductAction } from "@/app/actions/productActions";

export default function CreateProductPage() {
  return (
    <BaseForm
      action={createProductAction}
      submitLabel="Tambah Produk"
      successMessage="Produk berhasil ditambahkan"
    >
      <InputField name="nama" label="Nama Produk" required />
    </BaseForm>
  );
}
