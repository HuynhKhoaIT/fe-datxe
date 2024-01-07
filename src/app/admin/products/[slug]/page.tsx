"use client";
import { Box, Space } from "@mantine/core";
import React, { Suspense, useEffect, useState } from "react";
import ProductForm from "../create/ProductForm";
import { getCategories } from "@/app/libs/prisma/category";
async function getDataCategories() {
  const { categories } = await getCategories();
  if (!categories) {
    throw new Error("Failed to fetch data");
  }

  return categories;
}
export default function ProductSavePage({
  params,
}: {
  params: { slug: number };
}) {
  const [product, setProduct] = useState<any>();
  const [dataOption, setDataOption] = useState<any>([]);
  const getProductDetail = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "GET" });
      if (!res.ok) {
        throw new Error("Failed to fetch product details");
      }
      const data = await res.json();
      setProduct(data);
    } catch (error) {}
  };
  const getCategories = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/product-category`, {
        method: "GET",
      });
      console.log(res);
      if (!res.ok) {
        throw new Error("Failed to fetch category ");
      }
      const data = await res.json();
      const dataOption = data?.map((item: any) => ({
        value: item.id.toString(),
        label: item.title,
      }));
      setDataOption(dataOption);
    } catch (error) {}
  };
  useEffect(() => {
    getProductDetail(params.slug);
    getCategories();
  }, [params]);
  return (
    <Box maw={"100%"} mx="auto">
      <ProductForm
        isEditing={true}
        dataDetail={product}
        categoryOptions={dataOption}
      />
    </Box>
  );
}
