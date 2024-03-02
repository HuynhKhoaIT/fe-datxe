"use client";
import React from "react";
import { showStatus } from "@/utils/order";
import OrderDetailItem from "@/app/components/elements/dashboard/order/orderDetail";
import ListPage from "@/app/components/layout/ListPage";
import { Button } from "@mantine/core";
import TableBasic from "@/app/components/table/Tablebasic";
export default function OrderDetailPage({ dataSource }: any) {
  const columns = [
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Tên sản phẩm</span>,
      name: "product",
      dataIndex: ["product", "name"],
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Giá</span>,
      name: "priceSale",
      dataIndex: ["priceSale"],
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Số lượng</span>,
      name: "quantity",
      dataIndex: ["quantity"],
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Tổng tiền</span>,
      name: "subTotal",
      dataIndex: [],
      render: (dataRow: any) => {
        console.log(dataRow);
        return (
          <span>
            {(dataRow?.priceSale * dataRow?.quantity).toLocaleString()}đ
          </span>
        );
      },
    },
  ];
  return (
    <main className="main">
      <div className="order-item-single bg pt-60">
        <div className="container">
          <div className="card text-left mb-40">
            <div className="card-body">
              <div className="row invoice-info">
                {/* <InfoGarage infoGara={infoGara} /> */}
                <div className="col-sm-4 invoice-col">
                  <b>#{dataSource?.code}</b>
                  <br />
                  <b>Tổng đợn hàng: </b> {dataSource?.total.toLocaleString()}
                  <br />
                  <b>Trạng thái:</b> {showStatus(dataSource?.status)}
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
              <ListPage
                title="Chi tiết đơn hàng"
                style={{ height: "100%" }}
                baseTable={
                  <TableBasic
                    columns={columns}
                    data={dataSource?.orderDetails}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
