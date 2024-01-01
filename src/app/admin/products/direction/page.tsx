import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import React from "react";
export const dynamic = "force-dynamic";
import ProductSave from "../create/ProductSave";

export default function ProductDirection() {
  return (
    <Box maw={"100%"} mx="auto" className={styles.content}>
      <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Điều hướng sản phẩm
      </Typo>
      <Space h="md" />
      <ProductSave isDirection={true} />
    </Box>
  );
}
