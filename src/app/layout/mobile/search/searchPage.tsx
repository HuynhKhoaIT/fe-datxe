"use client";
import Container from "@/app/components/common/Container";
import Filter from "../danh-muc/Filter";
import Products from "../danh-muc/Products";
import styles from "./index.module.scss";
const SearchPageMobile = ({ kindProduct, products }: any) => {
  return (
    <div className={styles.wrapper}>
      <Filter kindProduct={kindProduct.data} />
      <Container>
        <Products products={products?.data} />
      </Container>
    </div>
  );
};
export default SearchPageMobile;
