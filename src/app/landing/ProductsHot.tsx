"use client";
import React, { useEffect, useState } from "react";
import Product from "../components/elements/product/ListProductHot";
import styles from "./index.module.scss";
import OverviewPanel from "../components/layout/OverviewPanel";
import ProductItem from "../components/elements/product/ProductItem";
import { Box, Button, Flex, Grid } from "@mantine/core";
import { IProduct } from "@/interfaces/product";
export default function ProductsHot() {
  const [products, setProducts] = useState<any>([]);

  async function getProductsHot() {
    const res = await fetch("/api/products?isProduct=1&limit=8", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
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
      stylesProps={{ marginBottom: "1rem" }}
      title="Sản phẩm hot"
      linkToList={"/san-pham"}
      id="products"
    >
      <Box w={"100%"}>
        <Grid>
          {products?.map((product: IProduct, index: number) => (
            <Grid.Col span={{ base: 12, xs: 6, sm: 4, md: 4, lg: 3 }}>
              <ProductItem product={product} key={index} />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </OverviewPanel>
  );
}
