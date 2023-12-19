import Orders from "@/app/components/elements/dashboard/order/orders";
import { getOrders } from "@/utils/order";
import React from "react";
export default async function OrderPage() {
  const orders = await getOrders(1);
  return <Orders ordersData={orders} />;
}
