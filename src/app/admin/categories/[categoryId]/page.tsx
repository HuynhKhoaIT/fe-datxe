"use client";
import React, { useEffect, useState } from "react";
import CategoryForm from "../create/CategoryForm";
import axios from "axios";
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
          `/api/product-category/${params?.categoryId}`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.categoryId]);
  return <CategoryForm isEditing={true} dataDetail={category} />;
}
