import RenderContext from "@/app/components/elements/RenderContext";
import OrdersListPage from "@/app/layout/dashboard/order/OrdersListPage";
import { getMyOrders } from "@/app/libs/prisma/order";
import { getMyAccount } from "@/utils/user";
export default async function Products() {
  const profile = await getMyAccount();
  const orders = await getMyOrders({ phoneNumber: profile?.phone });
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
