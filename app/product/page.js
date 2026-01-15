import { getProducts } from "../services/productService";
import { DataTable } from "../../components/datatable";
import { columns } from "./_components/columns";

export default async function ProductsPage() {
  const products = await getProducts();

  return <DataTable columns={columns} data={products} />;
}
