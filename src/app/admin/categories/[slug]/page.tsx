"use client";
import React, { useEffect, useState } from "react";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import CategoryForm from "../create/CategoryForm";
export default function UpdateCategory({
  params,
}: {
  params: { slug: number };
}) {
  const [dataDetail, setDataDetail] = useState<any>();
  useEffect(() => {
    fetch(`/api/product-category/${params?.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setDataDetail(data);
      });
  }, []);
  return (
    <Box maw={"100%"} mx="auto" className={styles.content}>
      <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Cập nhật danh mục sản phẩm
      </Typo>
      <Space h="md" />
      <CategoryForm isEditing={true} dataDetail={dataDetail} />
    </Box>
  );
}
