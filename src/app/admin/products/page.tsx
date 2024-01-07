import { getProductByGar } from "@/utils/product";
import ProductListPage from "./ProductListPage";
export const revalidate = 0;
import React from "react";
import { getProducts } from "@/app/libs/prisma/product";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import styles from "./index.module.scss";
import FooterAdmin from "@/app/components/page/footer/footerAdmin";
async function getData() {
  const { products } = await getProducts();
  if (!products) {
    throw new Error("Failed to fetch data");
  }
  return products;
}
export default async function ProductsManaga() {
  let garage_id: string = "9";
  const products = await getData();
  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Sản phẩm" },
  ];
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <ProductListPage dataSource={products} />
      <FooterAdmin />
    </div>
  );
}
