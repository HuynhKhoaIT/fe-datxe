"use client";
import React, { useEffect, useState } from "react";
import Product from "../components/elements/product/ListProductHot";
import styles from "./index.module.scss";
import OverviewPanel from "../components/layout/OverviewPanel";
import ProductItem from "../components/elements/product/ProductItem";
import { Box, Grid } from "@mantine/core";
import { IProduct } from "@/interfaces/product";
export default function ServicesHot() {
  const [services, setServices] = useState<any>([]);

  async function getServicesHot() {
    const res = await fetch("/api/products?isProduct=0&limit=8", {
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
        const servicesData = await getServicesHot();
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <OverviewPanel
      stylesProps={{ marginBottom: "1rem" }}
      title="Dịch vụ hot"
      linkToList={"/dich-vu"}
      id="products"
    >
      <Box w={"100%"}>
        <Grid>
          {services?.map((product: IProduct, index: number) => (
            <Grid.Col span={{ base: 12, xs: 6, sm: 4, md: 4, lg: 3 }}>
              <ProductItem product={product} key={index} />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </OverviewPanel>
  );
}
