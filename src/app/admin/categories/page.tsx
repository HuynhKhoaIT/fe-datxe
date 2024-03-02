import CategoryListPage from "./CategoryListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import styles from "./index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { apiUrl } from "@/constants";

async function getData() {
  const res = await fetch(`${apiUrl}api/product-category`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Categories() {
  let categories = await getData();
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh mục sản phẩm" },
  ];
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CategoryListPage dataSource={categories} />
    </div>
  );
}
