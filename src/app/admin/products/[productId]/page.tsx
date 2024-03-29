import { Box } from "@mantine/core";
import React from "react";
import ProductForm from "../create/ProductForm";
import { getProductById, getProducts } from "@/app/libs/prisma/product";
import { apiUrl } from "@/constants";
export const dynamic = "force-dynamic";

export const revalidate = 0;

async function getDataProduct(productId: number) {
  const res = await fetch(`${apiUrl}api/products/${Number(productId)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function ProductSavePage({
  params,
}: {
  params: { productId: number };
}) {
  const productDetail = await getProductById(params.productId);
  return <ProductForm isEditing={true} dataDetail={productDetail} />;
}
