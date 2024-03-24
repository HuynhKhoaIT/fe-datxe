import RenderContext from "@/app/components/elements/RenderContext";
import OrderDetailPage from "@/app/layout/desktop/gio-hang/OrderDetailPage";
import OrderDetailPageMobile from "@/app/layout/mobile/gio-hang/OrderDetailPageMobile";
import { findOrders, getOrderBySlug } from "@/app/libs/prisma/order";
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
  params: { orderId: string };
}) {
  const orderDetail = await getOrderBySlug(params.orderId);
  console.log(orderDetail);
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: OrderDetailPage,
        },
        mobile: {
          defaultTheme: OrderDetailPageMobile,
        },
      }}
      dataSource={orderDetail}
    />
  );
}
