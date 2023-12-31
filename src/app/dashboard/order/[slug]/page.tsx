import React from "react";
import { getOrder, getOrderDetail, showStatus } from "@/utils/order";
import OrderDetailItem from "@/app/components/elements/dashboard/order/orderDetail";
export default async function SingleOrder({
  params,
}: {
  params: { slug: number };
}) {
  const items = await getOrderDetail(params.slug);
  const order = await getOrder(params.slug);
  return (
    <main className="main">
      <div className="order-item-single bg pt-60">
        <div className="container">
          <div className="card text-left mb-40">
            <div className="card-body">
              <div className="row invoice-info">
                {/* <InfoGarage infoGara={infoGara} /> */}
                <div className="col-sm-4 invoice-col">
                  <b>#{order?.code}</b>
                  <br />
                  <b>Trạng thái:</b> {showStatus(order?.status)}
                  <br />
                  <b>Ngày tiếp nhận:</b> 2/22/2014
                  <br />
                  <b>Hoàn thành/Dự kiến:</b> 968-34567
                </div>
                <br />
              </div>
            </div>
          </div>
          <div className="row pb-60">
            <div className="col-12 table-responsive">
              <OrderDetailItem items={items ?? []} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
