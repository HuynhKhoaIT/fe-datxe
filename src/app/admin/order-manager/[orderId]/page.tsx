import React from "react";
import OrderForm from "./OrderForm";
import { apiUrl } from "@/constants";
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getDataProduct(productId: number) {
  const res = await fetch(`${apiUrl}api/orders/${Number(productId)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function ProductSavePage({
  params,
}: {
  params: { orderId: number };
}) {
  const productDetail = await getDataProduct(params.orderId);
  return (
    <div>
      <OrderForm isEditing={true} dataDetail={productDetail} />
    </div>
    // <>khoa</>
  );
}
// export async function generateStaticParams(): Promise<any[]> {
//   const { products } = await getProducts();
//   return (
//     products?.map((item) => {
//       return {
//         productId: item.id.toString(),
//       };
//     }) || []
//   );
// }
