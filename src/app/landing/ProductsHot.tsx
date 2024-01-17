"use client";
import React, { useEffect, useState } from "react";
import Product from "../components/elements/product/ListProductHot";
import styles from "./index.module.scss";
import OverviewPanel from "../components/layout/OverviewPanel";
import ProductItem from "../components/elements/product/ProductItem";
import { Box, Button, Flex, Grid } from "@mantine/core";
import { IProduct } from "@/interfaces/product";
export default function ProductsHot({ garageId = 9 }: any) {
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
      padding={"30px 0"}
    >
      <div className={styles.rowItem}>
        {products?.map((product: IProduct, index: number) => (
          <ProductItem product={product} key={index} />
        ))}
      </div>
    </OverviewPanel>
  );
}
