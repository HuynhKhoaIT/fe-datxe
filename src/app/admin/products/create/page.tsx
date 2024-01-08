"use client";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import React, { useEffect, useState } from "react";
import ProductSave from "./ProductSave";
import { getCategories } from "@/app/libs/prisma/category";
export default function CreateProduct() {
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
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
    getDataCategories();
  }, []);
  return (
    <Box maw={"100%"} mx="auto">
      <Space h="md" />
      <ProductSave isDirection={false} categoryOptions={categoryOptions} />
    </Box>
  );
}
