"use client";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import ProductForm from "./ProductForm";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProductDetail } from "@/utils/product";
import { LoadingComponent } from "@/app/components/loading";
export default function ProductSave({
  isDirection,
  categoryOptions = [],
}: any) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [productDetail, setProductDetail] = useState<any>();
  const handleGetProduct = async (productId: number) => {
    try {
      const res: any = await getProductDetail(productId);
      setProductDetail(res);
    } catch (error) {}
  };
  useEffect(() => {
    if (isDirection) {
      handleGetProduct(Number(productId));
    }
  }, [isDirection]);
  return (
    <Box maw={"100%"} mx="auto" className={styles.content}>
      <ProductForm
        isEditing={false}
        dataDetail={isDirection ? productDetail : []}
        isDirection={isDirection}
        categoryOptions={categoryOptions}
      />
    </Box>
  );
}
