"use client";
import CategoryListPage from "./CategoryListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import styles from "./index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Categories() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<any>([]);
  async function getDataCategories() {
    const res = await fetch(`/api/product-category`, { method: "GET" });
    const data = await res.json();
    setCategories(data);
  }
  useEffect(() => {
    getDataCategories();
  }, [searchParams]);
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
