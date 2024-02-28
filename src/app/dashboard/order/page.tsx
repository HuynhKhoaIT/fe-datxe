import RenderContext from "@/app/components/elements/RenderContext";
import OrdersListPage from "@/app/layout/dashboard/order/OrdersListPage";
import { apiUrl } from "@/constants";
import { getMyAccount } from "@/utils/user";
async function getDataOrder(garageId: number) {
  const res = await fetch(`${apiUrl}api/orders?garage=${garageId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default async function Products() {
  const myAccount: any = await getMyAccount();
  const orders = await getDataOrder(myAccount?.id);

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
