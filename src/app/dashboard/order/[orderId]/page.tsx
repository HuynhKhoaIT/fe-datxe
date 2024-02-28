import RenderContext from "@/app/components/elements/RenderContext";
import OrderDetailPage from "@/app/layout/dashboard/order/OrderDetailPage";
import { apiUrl } from "@/constants";
async function getDataProduct(productId: number) {
  const res = await fetch(`${apiUrl}api/orders/${Number(productId)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Products({
  params,
}: {
  params: { orderId: number };
}) {
  const orderDetail = await getDataProduct(params.orderId);
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
