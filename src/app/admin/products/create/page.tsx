"use client";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import ProductForm from "./ProductForm";
import { useEffect, useState } from "react";
export default function ProductSavePage() {
  const [categoryOptions, setCategoryOptions] = useState<any>();
  useEffect(() => {
    fetch(`/api/product-category`)
      .then((res) => res.json())
      .then((data) => {
        const dataOption = data?.map((item: any) => ({
          value: item.id.toString(),
          label: item.title,
        }));
        setCategoryOptions(dataOption);
      });
  }, []);
  return (
    <Box maw={"100%"} mx="auto" className={styles.content}>
      <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Thêm sản phẩm
      </Typo>
      <Space h="md" />
      <ProductForm isEditing={false} categoryOptions={categoryOptions} />
    </Box>
  );
}
