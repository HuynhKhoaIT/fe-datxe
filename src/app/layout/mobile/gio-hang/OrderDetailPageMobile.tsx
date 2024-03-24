"use client";
import React from "react";
import { Button, Container, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import styles from "./OrderDetailPage.module.scss";
import ImageField from "@/app/components/form/ImageField";
import ImageDefaul from "@/assets/images/logo.png";
import Typo from "@/app/components/elements/Typo";
import classNames from "classnames";
import dayjs from "dayjs";
import TableBasic from "@/app/components/table/Tablebasic";
const DynamicModalReview = dynamic(() => import("./ModalReview"), {
  ssr: false,
});
export default function OrderDetailPageMobile({ dataSource }: any) {
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
          Thành tiền
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
  ];
  return (
    <Container className="printable">
      <div className={styles.wrapper}>
        <Typo type="bold">{dataSource?.garage?.name}</Typo>
        <Typo size="small">Địa chỉ: {dataSource?.garage?.address}</Typo>
        <Typo size="small">Điện thoại :{dataSource?.garage?.phoneNumber}</Typo>
        <div className={styles.box}>
          <div className={styles.title}>
            <span>Phiếu báo giá</span>
          </div>
          <Typo size="mall" type="bold">
            {dayjs(dataSource?.dateTime).format("HH:mm DD:MM:YY")}
          </Typo>
          <Typo size="mall" type="bold">
            Mã đơn hàng:{dataSource?.code}
          </Typo>
        </div>
        <div className={styles.infoCustomer}>
          <div style={{ display: "flex", gap: "6px" }}>
            KH:
            <Typo size="primary" type="bold">
              {dataSource?.customer?.fullName}
            </Typo>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            ĐT:
            <Typo size="primary" type="bold">
              {dataSource?.customer?.phoneNumber}
            </Typo>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            XE:
            <Typo size="primary" type="bold">
              {dataSource?.car?.numberPlates}
            </Typo>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}></div>
        <TableBasic
          loading={false}
          columns={columns}
          data={dataSource?.orderDetails}
        />
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px dotted #333",
          }}
        >
          <p>Tiền hàng: </p>
          <p>{dataSource?.subTotal?.toLocaleString()}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px dotted #333",
          }}
        >
          <p>VAT: </p>
          <p>0</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px dotted #333",
          }}
        >
          <p>Tổng cộng: </p>
          <p>{dataSource?.total?.toLocaleString()}</p>
        </div>
        <div className={styles.titleThanks}>
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
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
    </Container>
  );
}
