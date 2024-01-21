"use client";
import { Button, Flex, Grid, Box, Space } from "@mantine/core";
import { FilterRadio } from "../components/elements/filterRadio";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Body from "../components/layout/Body";
import { IProduct } from "@/interfaces/product";
import ProductItem from "../components/elements/product/ProductItem";
import { Sort } from "../components/elements/shop-sort";
import { FilterCheckBox } from "../components/elements/filterCheckBox";

export default function ListSearch({ fillter }: any) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any>([]);
  const [activePage, setActivePage] = useState(1);
  async function getProductsHot(params: string, page: number) {
    const res = await fetch(`/api/products?page=${page}&${params}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProductsHot(
          searchParams.toString(),
          activePage
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [searchParams, activePage]);
  return (
    <Body>
      <Body.Sider>
        <FilterRadio
          data={fillter}
          filterName="Danh mục"
          keyName="categoryId"
        />
        <FilterCheckBox
          data={[
            { id: "1", title: "Sản phẩm" },
            { id: "0", title: "Dịch vụ" },
          ]}
          filterName="Loại"
          keyName="isProduct"
        />
      </Body.Sider>
      <Body.Content>
        <Sort lengthData={8} />
        <Space h="md" />
        <Box w={"100%"}>
          <Grid>
            {products?.map((product: IProduct, index: number) => (
              <Grid.Col span={{ base: 12, xs: 6, sm: 4, md: 4, lg: 3 }}>
                <ProductItem product={product} key={index} />
              </Grid.Col>
            ))}
          </Grid>
          <Flex justify="center" mt={36}>
            <Button color={"var(--theme-color)"}>Xem Thêm</Button>
          </Flex>
        </Box>
      </Body.Content>
    </Body>
  );
}
