import React, { useEffect, useState } from "react";
import { Box, Space } from "@mantine/core";
import CategoryForm from "../create/CategoryForm";
import { getCategories, getCategoryById } from "@/app/libs/prisma/category";
export const revalidate = 60;
async function getCategoriesData(params: Number) {
  const { category } = await getCategoryById(Number(params));
  return category;
}
export default async function UpdateCategory({
  params,
}: {
  params: { slug: number };
}) {
  const category = await getCategoriesData(params.slug);
  return (
    <Box maw={"100%"} mx="auto">
      <CategoryForm isEditing={true} dataDetail={category} />
    </Box>
  );
}

export async function generateStaticParams(): Promise<any[]> {
  const { categories } = await getCategories();
  return (
    categories?.map((item) => {
      return {
        categoryId: item.id.toString(),
      };
    }) || []
  );
}
