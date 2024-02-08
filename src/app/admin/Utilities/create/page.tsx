"use client";
import React from "react";
import { Box, Space } from "@mantine/core";
import UtilitiesForm from "./UtilitiesForm";
export default function CreateCategory() {
  return (
    <Box maw={"100%"} mx="auto">
      <UtilitiesForm isEditing={false} />
    </Box>
  );
}
