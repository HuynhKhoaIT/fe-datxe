"use client";
import { Button, Flex, Grid, Box, Space, LoadingOverlay } from "@mantine/core";
import { FilterRadio } from "../components/elements/filterRadio";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Body from "../components/layout/Body";
import { IProduct } from "@/interfaces/product";
import ProductItem from "../components/elements/product/ProductItem1";
import { Sort } from "../components/elements/shop-sort";
import { FilterCheckBox } from "../components/elements/filterCheckBox";
import { useSearch } from "../hooks/search/useSearch";

export default function ListSearch({ fillter }: any) {
  const [postCount, setPostCount] = useState(5);
  const { data: products, isPending, isFetching } = useSearch(postCount);
  if (isPending)
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
          <Box w={"100%"} h={"80vh"} pos={"relative"}>
            <LoadingOverlay
              visible={true}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
          </Box>
        </Body.Content>
      </Body>
    );

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
            {products?.data?.map((product: IProduct, index: number) => (
              <Grid.Col
                key={index}
                span={{ base: 12, xs: 6, sm: 4, md: 4, lg: 3 }}
              >
                <ProductItem product={product} />
              </Grid.Col>
            ))}
          </Grid>
          {postCount < products?.total && (
            <Flex justify="center" mt={36}>
              <Button
                color={"var(--theme-color)"}
                onClick={() => setPostCount(postCount + 5)}
                disabled={isFetching}
              >
                Xem Thêm
              </Button>
            </Flex>
          )}
        </Box>
      </Body.Content>
    </Body>
  );
}
