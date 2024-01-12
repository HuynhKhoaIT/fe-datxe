"use client";
import React from "react";
import { Box, Space } from "@mantine/core";
import CategoryForm from "./CategoryForm";
export default function CreateCategory() {
  return (
    <Box maw={"100%"} mx="auto">
      <CategoryForm isEditing={false} />
    </Box>
  );
}
