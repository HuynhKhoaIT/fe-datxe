import { getCategories } from "@/utils/category";
import ProductListPage from "./ProductListPage";
export default async function CarsPage() {
  const categories = await getCategories();

  return <ProductListPage categories={categories} />;
}
