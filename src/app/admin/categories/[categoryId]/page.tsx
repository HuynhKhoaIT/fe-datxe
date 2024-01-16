"use client";
import React, { useEffect, useState } from "react";
import { Box, Space } from "@mantine/core";
import CategoryForm from "../create/CategoryForm";
import { getCategories, getCategoryById } from "@/app/libs/prisma/category";
import axios from "axios";
import { apiUrl } from "@/constants";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { categoryId: number };
}) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}api/product-category/${params?.categoryId}`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.categoryId]);
  return (
    <Box maw={"100%"} mx="auto">
      <CategoryForm isEditing={true} dataDetail={category} />
    </Box>
  );
}
