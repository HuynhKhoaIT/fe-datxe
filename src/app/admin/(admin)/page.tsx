"use client";
import React from "react";
import styles from "./index.module.scss";
import Statistical from "../board/Statistical";
import Chart from "../chart";
import SellingProductListPage from "./SellingProductListPage";
export default function DashboardAdmin() {
  return (
    <div className={styles.wrapperAdmin}>
      <Statistical />
      <Chart />
      <SellingProductListPage />
    </div>
  );
}
