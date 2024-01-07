import prisma from "@/app/libs/prismadb";
import CategoryListPage from "./CategoryListPage";
import { getCategories } from "@/app/libs/prisma/category";
// export const dynamic = "force-dynamic";
export const revalidate = 0;
import styles from "./index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footerAdmin";
async function getData() {
  const { categories } = await getCategories();
  if (!categories) {
    throw new Error("Failed to fetch data");
  }
  return categories;
}
export default async function Categories() {
  const categories = await getData();
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh mục sản phẩm" },
  ];
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CategoryListPage dataSource={categories} />
      <FooterAdmin />
    </div>
  );
}
