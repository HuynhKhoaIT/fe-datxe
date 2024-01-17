"use client";
import React from "react";
import { Box, Space } from "@mantine/core";
import SupplierForm from "./SupplierForm";
export default function CreateSupplier() {
  return (
    <Box maw={"100%"} mx="auto">
      <SupplierForm isEditing={false} />
    </Box>
  );
}
