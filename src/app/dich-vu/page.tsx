import { getCategories } from "../libs/prisma/category";
import ListServices from "./ListServices";
export const revalidate = 0;

async function getCategoriesData() {
  const { categories } = await getCategories();
  if (!categories) {
    throw new Error("Failed to fetch data");
  }
  return categories;
}
export default async function Shop() {
  const categroies = await getCategoriesData();

  return <ListServices fillter={categroies} />;
}
