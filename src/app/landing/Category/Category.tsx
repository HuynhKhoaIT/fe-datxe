"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import OverviewPanel from "../../components/layout/OverviewPanel";
import SlickCarousel from "../common/SlickCarousell";
import { CardCategory } from "./CardCategory";
export default function Category({ categories }: any) {
  return (
    <OverviewPanel
      stylesProps={{ marginBottom: "1rem" }}
      title="Danh mục dịch vụ"
      subTitle="Danh mục dịch vụ phổ biến"
      linkToList={"/danh-muc"}
      id="categories"
      padding={"30px 0"}
    >
      <div className={styles.rowItem}>
        <SlickCarousel gap={8} column={4} height="200px">
          {categories?.map((item: any) => {
            return <CardCategory key={item?.id} category={item} garageId={0} />;
          })}
        </SlickCarousel>
      </div>
    </OverviewPanel>
  );
}
