"use client";
import { Box } from "@mantine/core";
import styles from "../index.module.scss";
import React, { useEffect, useState } from "react";
import ProductForm from "../create/ProductForm";
export const dynamic = "force-dynamic";

export default function ProductSavePage({
  params,
}: {
  params: { slug: number };
}) {
  const [productDetail, setProductDetail] = useState<any>([]);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  async function getProduct(productId: number) {
    const res = await fetch(`/api/products/${productId}`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    setProductDetail(data);
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
    getProduct(params.slug);
    getDataCategories();
  }, [params.slug]);
  console.log(categoryOptions);
  return (
    <Box maw={"100%"} mx="auto">
      <ProductForm
        isEditing={true}
        dataDetail={productDetail}
        categoryOptions={categoryOptions}
      />
    </Box>
  );
}
