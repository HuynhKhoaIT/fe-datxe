"use client";
import React from "react";
import { Box, Space } from "@mantine/core";
import CarForm from "./CarForm";
export default function CreateCar() {
  return (
    <Box maw={"100%"} mx="auto">
      <CarForm isEditing={false} />
    </Box>
  );
}
