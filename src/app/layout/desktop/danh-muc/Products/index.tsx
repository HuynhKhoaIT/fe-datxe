"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import { Button, Flex } from "@mantine/core";
const Products = ({
  products,
  productCount,
  setProductCount,
  isFetching,
}: any) => {
  console.log(products);
  return (
    <div className={styles.wrapper}>
      <div className={styles.rowItem}>
        {products?.data?.map((product: IProduct, index: number) => (
          <ProductItem2 product={product} key={index} />
        ))}
      </div>
      {productCount < products?.total && (
        <Flex justify="center" mt={36}>
          <Button
            color={"var(--theme-color)"}
            onClick={() => setProductCount(productCount + 5)}
            disabled={isFetching}
          >
            Xem Thêm
          </Button>
        </Flex>
      )}
    </div>
  );
};
export default Products;
