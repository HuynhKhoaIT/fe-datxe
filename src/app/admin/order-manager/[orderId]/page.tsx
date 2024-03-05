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
  const productDetail = await findOrders(params.orderId,{});
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
