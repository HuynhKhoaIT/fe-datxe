"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Box, Button, Flex, Grid } from "@mantine/core";
import { IProduct } from "@/interfaces/product";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import SlickCarousel from "@/app/components/common/SlickCarousell";

export default function ProductSuggestions({ data }: any) {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Gợi ý sản phẩm"
      linkToList={"/san-pham"}
      id="productSuggestions"
    >
      <div className={styles.rowItem}>
        {data?.map((product: IProduct, index: number) => (
          <ProductItem2 product={product} key={index} />
        ))}
      </div>
    </OverviewPanel>
  );
}
