import prisma from "@/app/libs/prismadb";
import CategoryListPage from "./CategoryListPage";
import { getCategories } from "@/app/libs/prisma/category";
// export const dynamic = "force-dynamic";
export const revalidate = 0;
async function getData() {
  const { categories } = await getCategories();
  if (!categories) {
    throw new Error("Failed to fetch data");
  }
  return categories;
}
export default async function Categories() {
  const categories = await getData();
  return <CategoryListPage dataSource={categories} />;
}
