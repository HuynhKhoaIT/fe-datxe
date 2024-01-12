import { getCategories } from "../libs/prisma/category";
import ListSearch from "./ListSearch";
export const revalidate = 0;

async function getCategoriesData() {
  const { categories } = await getCategories();
  if (!categories) {
    throw new Error("Failed to fetch data");
  }
  return categories;
}
export default async function Search() {
  const categroies = await getCategoriesData();

  return <ListSearch fillter={categroies} />;
}
