"use client";
import React, { useEffect, useState } from "react";
import Product from "../components/elements/product/ListProductHot";
import styles from "./index.module.scss";
import OverviewPanel from "../components/layout/OverviewPanel";
import ProductItem from "../components/elements/product/ProductItem1";
import { Box, Button, Flex, Grid } from "@mantine/core";
import { IProduct } from "@/interfaces/product";
import ProductItem2 from "../components/elements/product/ProductItem2";
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
      title="Sản phẩm ưu đãi"
      linkToList={"/san-pham"}
      id="products"
    >
      <div className={styles.rowItem}>
        {products?.map((product: IProduct, index: number) => (
          <ProductItem2 product={product} key={index} />
        ))}
      </div>
    </OverviewPanel>
  );
}
