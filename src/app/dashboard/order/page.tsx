
import RenderContext from "@/app/components/elements/RenderContext";
import OrdersListPage from "@/app/layout/dashboard/order/OrdersListPage";
import { getMyOrders } from "@/app/libs/prisma/order";
import { useSession } from "next-auth/react";
export default async function Products() {
  const orders = await getMyOrders({phoneNumber: '0964824588'});
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: OrdersListPage,
        },
        mobile: {
          defaultTheme: OrdersListPage,
        },
      }}
      dataSource={orders}
    />
  );
}
