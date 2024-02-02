"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem from "@/app/components/elements/product/ProductItem1";
const Service = ({ services }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        stylesProps={{ padding: "30px 0" }}
        title="Dịch vụ của chuyên gia"
        subTitle="Các dịch vụ dành cho xe bạn"
        linkToList={"/dich-vu"}
        id="services-expert"
      >
        <div className={styles.rowItem}>
          {services?.map((product: IProduct, index: number) => (
            <ProductItem product={product} key={index} />
          ))}
        </div>
      </OverviewPanel>{" "}
    </div>
  );
};
export default Service;
