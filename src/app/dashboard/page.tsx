import React from "react";
import styles from "./index.module.scss";
import Statistical from "../admin/board/Statistical";
import OrdersListPage from "../layout/dashboard/order/OrdersListPage";
import { getOrders } from "../libs/prisma/order";
export default async function Dashboard() {
  const orders = await getOrders(9, {});

  return (
    <>
      <div className={styles.page}>
        <Statistical />
      </div>
      <OrdersListPage dataSource={orders} />
    </>
  );
}
