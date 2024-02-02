"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import ProductItem from "@/app/components/elements/product/ProductItem1";
export default function ServicesHot({ data }: any) {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Dịch vụ khuyến mãi"
      subTitle="Các dịch vụ dành cho xe bạn"
      linkToList={"/dich-vu"}
      id="services"
    >
      <div className={styles.rowItem}>
        {data?.map((product: IProduct, index: number) => (
          <ProductItem product={product} key={index} />
        ))}
      </div>
    </OverviewPanel>
  );
}
