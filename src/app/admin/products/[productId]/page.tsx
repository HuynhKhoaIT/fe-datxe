import { Box } from "@mantine/core";
import styles from "../index.module.scss";
import React, { useEffect, useState } from "react";
import ProductForm from "../create/ProductForm";
import { getProductById, getProducts } from "@/app/libs/prisma/product";
import { getCategories } from "@/app/libs/prisma/category";
export const dynamic = "force-dynamic";

async function getProductDetail(param: number) {
  console.log("productDetail", param);
  const { product } = await getProductById(param);

  return product;
}
async function getCategpriesOption() {
  const { categories } = await getCategories();
  const dataOption = categories?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  return dataOption;
}
export default async function ProductSavePage({
  params,
}: {
  params: { slug: number };
}) {
  const productDetail = getProductDetail(Number(params.slug));
  const categoryOptions = getCategpriesOption();

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
export async function generateStaticParams(): Promise<any[]> {
  const { products } = await getProducts();
  return (
    products?.map((item) => {
      return {
        productId: item.id.toString(),
      };
    }) || []
  );
}
