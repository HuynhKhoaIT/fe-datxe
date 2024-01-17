"use client";
import { getProductByGar } from "@/utils/product";
import ProductListPage from "./ProductListPage";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { useSearchParams } from "next/navigation";
export default function ProductsManaga() {
  const searchParams = useSearchParams();
  let garage_id: string = "9";
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<any>();

  async function getData(searchParams: any, page: number) {
    const res = await getProductByGar(
      searchParams,
      garage_id.toString(),
      10,
      page
    );
    setProducts(res);
  }
  useEffect(() => {
    getData(searchParams.toString(), page);
  }, [searchParams, page]);
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Sản phẩm trong kho" },
  ];
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <ProductListPage
        productsGara={products}
        setPage={setPage}
        activePage={page}
      />
      <FooterAdmin />
    </div>
  );
}
