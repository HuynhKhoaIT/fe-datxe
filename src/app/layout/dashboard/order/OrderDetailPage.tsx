"use client";
import React from "react";
import { showStatus } from "@/utils/order";
import OrderDetailItem from "@/app/components/elements/dashboard/order/orderDetail";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";
import { Badge, Button, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { stepOrderOptions } from "@/constants/masterData";

const DynamicModalReview = dynamic(() => import("./ModalReview"), {
  ssr: false,
});
export default function OrderDetailPage({ dataSource }: any) {
  console.log(dataSource);
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên sản phẩm
        </span>
      ),
      name: "product",
      dataIndex: ["product", "name"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá</span>
      ),
      name: "priceSale",
      dataIndex: ["priceSale"],
      render: (dataRow: any) => {
        return <span>{dataRow.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Số lượng</span>
      ),
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tổng tiền
        </span>
      ),
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
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "100px",
      render: (record: any) => {
        return (
          <Tooltip label="Đánh giá" withArrow position="bottom">
            <Button size="lg" radius={0} variant="outline" onClick={openModal}>
              Đánh giá
            </Button>
          </Tooltip>
        );
      },
    },
  ];
  return (
    <main className="main">
      <div className="order-item-single bg pt-60">
        <div>
          <div className="card text-left mb-40">
            <div className="card-body">
              <div className="row invoice-info">
                {/* <InfoGarage infoGara={infoGara} /> */}
                <div className="col-sm-4 invoice-col">
                  <b>#{dataSource?.code}</b>
                  <br />
                  <b>Tổng đơn hàng: </b> {dataSource?.total.toLocaleString()}
                  <br />
                  <b>Trạng thái:</b> {showStatus(dataSource?.step.toString())}
                  <br />
                  <b>Ngày tiếp nhận:</b> 2/22/2014
                  <br />
                  <b>Hoàn thành/Dự kiến:</b> 968-34567
                </div>
                <br />
              </div>
            </div>
          </div>
          <ListPage
            title="Chi tiết đơn hàng"
            style={{ height: "100%" }}
            baseTable={
              <TableBasic columns={columns} data={dataSource?.orderDetails} />
            }
          />
        </div>
      </div>
      {openedModal && (
        <DynamicModalReview
          openedModal={openedModal}
          onCloseModal={closeModal}
          title="Đánh giá sản phẩm"
          onCancelModal={closeModal}
          dataDetail={dataSource}
        />
      )}
    </main>
  );
}
