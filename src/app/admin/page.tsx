import { getOrders } from "@/utils/order";
import Orders from "../components/elements/dashboard/order/orders";
import React from "react";
export default function DashboardAdmin() {
  // const orders = await getOrders(1);
  return (
    <div>
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="dashboard-widget dashboard-widget-color-1">
            <div className="dashboard-widget-info">
              <h1>0</h1>
              <span>Điểm mua hàng </span>
            </div>
            <div className="dashboard-widget-icon">
              <i className="fal fa-list"></i>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="dashboard-widget dashboard-widget-color-3">
            <div className="dashboard-widget-info">
              <h1>18.6k</h1>
              <span>Đơn hàng</span>
            </div>
            <div className="dashboard-widget-icon">
              <i className="fal fa-eye"></i>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="dashboard-widget dashboard-widget-color-2">
            <div className="dashboard-widget-info">
              <h1>1560</h1>
              <span>Đơn hàng thành công</span>
            </div>
            <div className="dashboard-widget-icon">
              <i className="fal fa-layer-group"></i>
            </div>
          </div>
        </div>
      </div>
      {/* <Orders ordersData={orders} /> */}
    </div>
  );
}
