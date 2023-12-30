"use client";
import { IProduct } from "@/interfaces/product";
import { getProductByGar, getProductsHot } from "@/utils/product";
import { useEffect, useState } from "react";
import ProductItem from "./productItem";
import { Box, Button, Flex, Grid } from "@mantine/core";
export default function Product({
  initialProductData,
  garageId = 0,
}: {
  initialProductData: IProduct[];
  garageId: any;
}) {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [limit, setLimit] = useState<number>(8);
  const handleButtonClick = async () => {
    if (garageId != 0) {
      let newProductData = await getProductByGar(
        garageId.toString(),
        limit + 4
      );
      setProductData(newProductData);
    } else {
      let newProductData = await getProductsHot({ limit: limit + 4 });
      setProductData(newProductData);
    }
    setLimit(limit + 4);
  };

  useEffect(() => {
    setProductData(initialProductData);
  }, [initialProductData]);

  return (
    <Box w={"100%"}>
      <Grid>
        {productData?.map((product: IProduct, index: number) => (
          <Grid.Col span={{ base: 12, xs: 6, sm: 4, md: 4, lg: 3 }}>
            <ProductItem product={product} key={index} />
          </Grid.Col>
        ))}
      </Grid>
      <Flex justify="center" mt={36}>
        <Button onClick={handleButtonClick} color={"var(--theme-color)"}>
          Xem Thêm
        </Button>
      </Flex>
    </Box>
  );
}
