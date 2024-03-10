import ProductBrandListPage from "./ProductBrandListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { apiUrl } from "@/constants";
import { Fragment } from "react";

async function getData() {
  const res = await fetch(`${apiUrl}api/product-brands`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function ProductBrand() {
  let categories = await getData();
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Thương hiệu" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <ProductBrandListPage dataSource={categories} />
    </Fragment>
  );
}
