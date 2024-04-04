"use client";
import React from "react";
import ProductForm from "../create/ProductForm";
import { useProductDetail } from "../../hooks/product/useProduct";
export const dynamic = "force-dynamic";

export const revalidate = 0;

export default function ProductSavePage({
  params,
}: {
  params: { productId: string };
}) {
  const { data: productDetail } = useProductDetail(params?.productId);
  return <ProductForm isEditing={true} dataDetail={productDetail?.data} />;
}
