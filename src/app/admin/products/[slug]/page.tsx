"use client";
import { Box, Space } from "@mantine/core";
import { useEffect, useState } from "react";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import ProductForm from "../create/ProductForm";
import { IProduct } from "@/interfaces/product";
export default function ProductSavePage({
  params,
}: {
  params: { slug: number };
}) {
  const [dataDetail, setDataDetail] = useState<IProduct>();
  useEffect(() => {
    fetch(`/api/products/${params?.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setDataDetail(data);
      });
  }, []);
  return (
    <Box maw={"100%"} mx="auto" className={styles.content}>
      <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Cập nhật sản phẩm
      </Typo>
      <Space h="md" />
      <ProductForm isEditing={true} dataDetail={dataDetail} />
    </Box>
  );
}
