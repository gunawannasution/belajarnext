import { BaseForm } from "@/components/form/BaseForm";
import { InputField } from "@/components/form/field";
import { createProductAction } from "@/app/actions/productActions";
import { z } from "zod";

const schema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
});

export default function CreateProductPage() {
  return (
    <BaseForm
      action={createProductAction}
      schema={schema}
      submitLabel="Tambah Produk"
      successMessage="Produk berhasil ditambahkan"
    >
      <InputField name="nama" label="Nama Produk" />
    </BaseForm>
  );
}
