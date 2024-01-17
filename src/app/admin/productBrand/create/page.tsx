"use client";
import React from "react";
import { Box, Space } from "@mantine/core";
import ProductBrandForm from "./ProductBrandForm";
export default function CreateSupplier() {
  return (
    <Box maw={"100%"} mx="auto">
      <ProductBrandForm isEditing={false} />
    </Box>
  );
}
