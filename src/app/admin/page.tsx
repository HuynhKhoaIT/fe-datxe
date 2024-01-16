import { getOrders } from "@/utils/order";
import Orders from "../components/elements/dashboard/order/orders";
import React from "react";
import styles from "./index.module.scss";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import Breadcrumb from "../components/form/Breadcrumb";
import Statistical from "./board/Statistical";
export default function DashboardAdmin() {
  const Breadcrumbs = [{ title: "Tổng quan" }];
  return (
    <div className={styles.wrapperAdmin}>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <Statistical />
      <FooterAdmin />
    </div>
  );
}
