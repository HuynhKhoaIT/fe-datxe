"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import ProductItem from "@/app/components/elements/product/ProductItem1";
export default function ServicesHot({ garageId = 9 }: any) {
  const [services, setServices] = useState<any>([]);
  async function getServicesHot() {
    const res = await fetch(
      `/api/products?isProduct=0&garageId=${garageId}&limit=8`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesData = await getServicesHot();
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Dịch vụ khuyến mãi"
      subTitle="Các dịch vụ dành cho xe bạn"
      linkToList={"/dich-vu"}
      id="services"
    >
      <div className={styles.rowItem}>
        {services?.map((product: IProduct, index: number) => (
          <ProductItem product={product} key={index} />
        ))}
      </div>
    </OverviewPanel>
  );
}
