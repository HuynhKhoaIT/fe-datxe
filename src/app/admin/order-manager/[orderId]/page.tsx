import React from "react";
import OrderForm from "./OrderForm";
import { apiUrl } from "@/constants";
import { findOrders } from "@/app/libs/prisma/order";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductSavePage({
  params,
}: {
  params: { orderId: number };
}) {
  const productDetail = await findOrders(params.orderId, {});
  return <OrderForm isEditing={true} dataDetail={productDetail} />;
}
