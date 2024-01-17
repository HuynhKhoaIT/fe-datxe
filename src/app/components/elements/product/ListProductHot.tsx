"use client";
import { IProduct } from "@/interfaces/product";
import { getProductByGar, getProductsHot } from "@/utils/product";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid } from "@mantine/core";
import ProductItem from "./ProductItem";
export default function Product({
  initialProductData = [],
  garageId = 0,
  limit: defaultLimit = 8,
}: any) {
  const [productData, setProductData] = useState<IProduct[]>([]);
  // const [limit, setLimit] = useState<number>(defaultLimit);
  // const handleButtonClick = async () => {
  //   if (garageId != 0) {
  //     let productLoadmore = await fetch(`/api/products?limit=${limit + 4}`);
  //     let newProductData = await getProductByGar(
  //       garageId.toString(),
  //       limit + 4
  //     );
  //     setProductData(newProductData);
  //   } else {
  //     let productLoadmore = await fetch(`/api/products?limit=${limit + 4}`);
  //     let data = await productLoadmore.json();

  //     let newProductData = await getProductsHot({ limit: limit + 4 });
  //     setProductData(data);
  //   }
  //   setLimit(limit + 4);
  // };

  // useEffect(() => {
  //   setProductData(initialProductData);
  // }, [initialProductData]);

  return (
    <Box w={"100%"}>
      <Grid>
        {productData?.map((product: IProduct, index: number) => (
          <Grid.Col span={{ base: 12, xs: 6, sm: 4, md: 4, lg: 3 }}>
            <ProductItem product={product} key={index} />
          </Grid.Col>
        ))}
      </Grid>
      {/* <Flex justify="center" mt={36}>
        <Button onClick={handleButtonClick} color={"var(--theme-color)"}>
          Xem Thêm
        </Button>
      </Flex> */}
    </Box>
  );
}
