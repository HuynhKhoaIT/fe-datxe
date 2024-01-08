"use client";
import { getProductByGar } from "@/utils/product";
import ProductListPage from "./ProductListPage";
export const revalidate = 0;
import React, { useEffect, useState } from "react";
import { getProducts } from "@/app/libs/prisma/product";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import styles from "./index.module.scss";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { useSearchParams } from "next/navigation";

export default function ProductsManaga() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any>();
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Sản phẩm" },
  ];
  async function getData(searchParams: any, page: number) {
    const res = await fetch(`/api/products?${searchParams}&page=${page}`, {
      method: "GET",
    });
    const data = await res.json();
    setProducts(data);
  }
  async function getDataCategories() {
    const res = await fetch(`/api/product-category`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setCategoryOptions(dataOption);
  }
  useEffect(() => {
    getData(searchParams.toString(), page);
    getDataCategories();
  }, [searchParams, page]);
  console.log("searchParams", searchParams.toString());
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <ProductListPage
        dataSource={products}
        setPage={setPage}
        activePage={page}
        categoryOptions={categoryOptions}
      />
      <FooterAdmin />
    </div>
  );
}
