"use client";
import React, { useEffect, useState } from "react";
import { Box, Space } from "@mantine/core";
import ProductBrandForm from "../create/ProductBrandForm";
import { getCategories, getCategoryById } from "@/app/libs/prisma/category";
import axios from "axios";
import { apiUrl } from "@/constants";
export const revalidate = 60;
export default function UpdateProductBrand({
  params,
}: {
  params: { categoryId: number };
}) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/product-category/${params?.categoryId}`
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
      <ProductBrandForm isEditing={true} dataDetail={category} />
    </Box>
  );
}
