"use client";
import React, { useEffect, useState } from "react";
import { Box, Space } from "@mantine/core";
import ProductBrandForm from "../create/ProductBrandForm";
import axios from "axios";
export const revalidate = 60;
export default function UpdateProductBrand({
  params,
}: {
  params: { brandId: number };
}) {
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/product-brands/${params?.brandId}`
        );
        setBrand(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.brandId]);
  return <ProductBrandForm isEditing={true} dataDetail={brand} />;
}
