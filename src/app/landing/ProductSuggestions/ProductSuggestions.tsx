"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Box, Button, Flex, Grid } from "@mantine/core";
import { IProduct } from "@/interfaces/product";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import SlickCarousel from "../common/SlickCarousell";
export default function ProductSuggestions({ garageId = 9 }: any) {
  const [products, setProducts] = useState<any>([]);

  async function getProductsHot() {
    const res = await fetch(
      `/api/products?isProduct=1&garageId=${garageId}&limit=8`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProductsHot();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Gợi ý sản phẩm liên quan"
      linkToList={"/san-pham"}
      id="productSuggestions"
    >
      <SlickCarousel column={4} gap={8} dots={true}>
        {products?.map((product: IProduct, index: number) => (
          <ProductItem2 product={product} key={index} />
        ))}
      </SlickCarousel>
    </OverviewPanel>
  );
}
