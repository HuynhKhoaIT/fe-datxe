import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import ProductForm from "../create/ProductForm";
import React from "react";
import prisma from "@/app/libs/prismadb";
import { getProductById } from "@/app/libs/prisma";
export const dynamic = "force-dynamic";

async function getProduct(productId: number) {
  const { product } = await getProductById(productId);
  if (!product) {
    throw new Error("Failed to fetch data");
  }

  return product;
}
export default async function ProductSavePage({
  params,
}: {
  params: { slug: number };
}) {
  const product = await getProduct(params?.slug);
  const categories = await prisma.productCategory.findMany();
  const dataOption = categories?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  return (
    <Box maw={"100%"} mx="auto" className={styles.content}>
      <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Cập nhật sản phẩm
      </Typo>
      <Space h="md" />
      <ProductForm
        isEditing={true}
        dataDetail={product}
        categoryOptions={dataOption}
      />
    </Box>
  );
}
