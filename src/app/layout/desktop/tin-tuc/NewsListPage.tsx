"use client";
import { Button, Flex, Grid, Box, Space } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IProduct } from "@/interfaces/product";
import Body from "@/app/components/layout/Body";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import { Sort } from "@/app/components/elements/shop-sort";
import ProductItem from "@/app/components/elements/product/ProductItem1";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import CardBlog from "../trang-chu/Blogs/CardBlog";
import ItemNews from "./_component/ItemNews";
import Container from "@/app/components/common/Container";

export default function NewsListPage({ newsData }: any) {
  console.log(newsData);
  return (
    <Container>
      <Box w={"100%"}>
        <Grid>
          {newsData?.data?.map((item: any, index: number) => (
            <Grid.Col
              key={index}
              span={{ base: 12, xs: 12, sm: 12, md: 12, lg: 12 }}
            >
              <ItemNews item={item} />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
