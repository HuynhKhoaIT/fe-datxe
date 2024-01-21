import { Box, Space } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ProductSave from "./ProductSave";
export default function CreateProduct() {
  return (
    <Box maw={"100%"} mx="auto">
      <Space h="md" />
      <ProductSave isDirection={false} />
    </Box>
  );
}
