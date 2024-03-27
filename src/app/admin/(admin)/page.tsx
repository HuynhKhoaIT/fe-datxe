"use client";
import React, { Fragment } from "react";
import Statistical from "../_component/Statistical";
import styles from "./index.module.scss";
import Chart from "../_component/chart";
import SellingProductListPage from "./SellingProductListPage";
export default function DashboardAdmin() {
  return (
    <div className={styles.main}>
      {/* <Camera /> */}
      <Statistical />
      <Chart />
      {/* <SellingProductListPage /> */}
    </div>
  );
}
