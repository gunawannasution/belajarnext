import { BaseForm } from "@/components/form/BaseForm";
import { InputField } from "@/components/form/field";
import { updateProductAction } from "@/app/actions/productActions";
import prisma from "@/app/lib/prisma";
import { z } from "zod";

const schema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
});

export default async function EditProductPage({ params }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });

  return (
    <BaseForm
      action={updateProductAction.bind(null, product.id)}
      schema={schema}
      submitLabel="Update Produk"
      successMessage="Produk berhasil diperbarui"
    >
      <InputField name="nama" label="Nama Produk" defaultValue={product.nama} />
    </BaseForm>
  );
}
