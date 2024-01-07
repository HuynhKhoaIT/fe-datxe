import { getProductByGar } from "@/utils/product";
import ProductListPage from "./ProductListPage";
import React from "react";
import styles from "./index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footerAdmin";
export default async function ProductsManaga() {
  let garage_id: string = "9";
  const productsGara = await getProductByGar(garage_id.toString(), 20);
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Sản phẩm trong kho" },
  ];
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <ProductListPage productsGara={productsGara} />
      <FooterAdmin />
    </div>
  );
}
