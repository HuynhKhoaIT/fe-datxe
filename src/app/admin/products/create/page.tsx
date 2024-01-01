import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import React from "react";
import ProductSave from "./ProductSave";
export default function CreateProduct() {
  return (
    <Box maw={"100%"} mx="auto" className={styles.content}>
      <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Thêm sản phẩm
      </Typo>
      <Space h="md" />
      <ProductSave isDirection={false} />
    </Box>
  );
}
