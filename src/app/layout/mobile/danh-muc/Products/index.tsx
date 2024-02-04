"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
const Products = ({ products }: any) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.rowItem}>
        {products?.map((product: IProduct, index: number) => (
          <ProductItem2 product={product} key={index} />
        ))}
      </div>
    </div>
  );
};
export default Products;
