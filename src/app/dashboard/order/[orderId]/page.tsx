import RenderContext from "@/app/components/elements/RenderContext";
import OrderDetailPage from "@/app/layout/dashboard/order/OrderDetailPage";
import { findOrders } from "@/app/libs/prisma/order";
import { apiUrl } from "@/constants";
import { getOrderDetail } from "@/utils/order";
// async function getDataProduct(productId: number) {
//   const res = await fetch(`${apiUrl}api/orders/${Number(productId)}`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

export default async function Products({
  params,
}: {
  params: { orderId: number };
}) {
  const orderDetail = await findOrders(params.orderId,{});
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: OrderDetailPage,
        },
        mobile: {
          defaultTheme: OrderDetailPage,
        },
      }}
      dataSource={orderDetail}
    />
  );
}
