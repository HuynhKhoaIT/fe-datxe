import prisma from "@/app/libs/prismadb";
import CategoryListPage from "./CategoryListPage";
// export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Categories() {
  const categories = await prisma.productCategory.findMany();
  return <CategoryListPage dataSource={categories} />;
}
