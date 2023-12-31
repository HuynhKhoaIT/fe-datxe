"use client";
import React from "react";
import { Box, Space } from "@mantine/core";
import CategoryForm from "./CategoryForm";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
export default function CreateCategory() {
  return (
    <Box maw={"100%"} mx="auto">
      {/* <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Thêm danh mục sản phẩm
      </Typo> */}
      <CategoryForm isEditing={false} />
    </Box>
  );
}
