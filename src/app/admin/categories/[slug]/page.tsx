import React from "react";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import CategoryForm from "../create/CategoryForm";
import { getCategoryById } from "@/app/libs/prisma/category";

async function getData(categoryId: number) {
  const { category } = await getCategoryById(categoryId);
  if (!category) {
    throw new Error("Failed to fetch data");
  }
  return category;
}
export default async function UpdateCategory({
  params,
}: {
  params: { slug: number };
}) {
  const dataDetail = await getData(Number(params?.slug));
  return (
    <Box maw={"100%"} mx="auto">
      {/* <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Cập nhật danh mục sản phẩm
      </Typo> */}
      <CategoryForm isEditing={true} dataDetail={dataDetail} />
    </Box>
  );
}
