import { getCategories } from "../libs/prisma/category";
import ListProducts from "./ListProducts";
export const revalidate = 0;

async function getCategoriesData() {
  const { categories } = await getCategories();
  if (!categories) {
    throw new Error("Failed to fetch data");
  }
  return categories;
}
export default async function Products() {
  const categroies = await getCategoriesData();

  return <ListProducts fillter={categroies} />;
}
