import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import React from "react";
import ProductSave from "./ProductSave";
import { getCategories } from "@/app/libs/prisma/category";

async function getDataCategories() {
  const { categories } = await getCategories();
  if (!categories) {
    throw new Error("Failed to fetch data");
  }

  return categories;
}

export default async function CreateProduct() {
  const categories = await getDataCategories();
  const dataOptions = categories?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  return (
    <Box maw={"100%"} mx="auto">
      <Space h="md" />
      <ProductSave isDirection={false} categoryOptions={dataOptions} />
    </Box>
  );
}
