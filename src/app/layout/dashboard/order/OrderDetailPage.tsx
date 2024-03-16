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
import Container from "@/app/components/common/Container";
import styles from "./OrderDetailPage.module.scss";
import ImageField from "@/app/components/form/ImageField";
import ImageDefaul from "@/assets/images/logo.png";
import Typo from "@/app/components/elements/Typo";
import classNames from "classnames";
import dayjs from "dayjs";
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
  console.log(dayjs(dataSource?.dateTime).format("HH:mm DD:MM:YY"));
  return (
    <Container>
      <div className={styles.infoGara}>
        <div className={styles.info}>
          <div className={styles.imageGara}>
            <ImageField src={ImageDefaul.src} width={160} />
          </div>
          <div className={styles.detailInfo}>
            <Typo type="bold" style={{ color: "var(--primary-color)" }}>
              {dataSource?.garage?.name}
            </Typo>
            <Typo
              style={{ color: "var(--primary-color)" }}
              size="sub"
              type="bold"
            >
              <span style={{ fontSize: 16, fontWeight: 400 }}>Add:</span>{" "}
              {dataSource?.garage?.address}
            </Typo>
            <Typo
              style={{ color: "var(--primary-color)" }}
              size="sub"
              type="bold"
            >
              <span style={{ fontSize: 16, fontWeight: 400 }}>Phone/Zalo:</span>
              {dataSource?.garage?.phoneNumber}
            </Typo>
            <Typo
              style={{ color: "var(--primary-color)" }}
              size="sub"
              type="bold"
            >
              <span style={{ fontSize: 16, fontWeight: 400 }}>emil:</span>
              {dataSource?.garage?.email}
            </Typo>
          </div>
        </div>
        <div className={styles.qrGara}></div>
      </div>
      <div className={styles.title}>
        <span>Phiếu báo giá</span>
      </div>
      <div className={styles.date}>
        <Typo size="sub" type="bold">
          {dayjs(dataSource?.createdAt).format("DD [tháng] MM [năm] YYYY")}
        </Typo>
        <Typo size="sub" type="bold">
          Số báo giá:{dataSource?.code}
        </Typo>
      </div>
      <div className={styles.infoCustomer}>
        <div className={classNames(styles._1, styles.item)}>Khách hàng:</div>
        <div className={classNames(styles._2, styles.item)}>
          {dataSource?.customer?.fullName}
        </div>
        <div className={classNames(styles._3, styles.item)}>Điện thoại</div>
        <div className={classNames(styles._4, styles.item)}>
          {dataSource?.customer?.phoneNumber}
        </div>
        <div className={classNames(styles._5, styles.item)}>Địa chỉ</div>
        <div className={classNames(styles._6, styles.item)}>
          {dataSource?.customer?.address}
        </div>
        <div className={classNames(styles._7, styles.item)}>Biển sô</div>
        <div className={classNames(styles._8, styles.item)}>
          {dataSource?.car?.numberPlates}
        </div>
        <div className={classNames(styles._9, styles.item)}>hiệu xe</div>
        <div className={classNames(styles._10, styles.item)}>BMW</div>
        <div className={classNames(styles._11, styles.item)}>Model</div>
        <div className={classNames(styles._12, styles.item)}>230i</div>
        <div className={classNames(styles._13, styles.item)}>Số vin</div>
        <div className={classNames(styles._14, styles.item)}>WBA1237473838</div>
        <div className={classNames(styles._15, styles.item)}>Số Km</div>
        <div className={classNames(styles._16, styles.item)}>1299</div>
        <div className={classNames(styles._17, styles.item)}>
          Km BD tiếp theo
        </div>
        <div className={classNames(styles._18, styles.item)}></div>
        <div className={classNames(styles._19, styles.item)}></div>
        <div className={classNames(styles._20, styles.item)}>Ngày vào</div>
        <div className={classNames(styles._21, styles.item)}>
          {dayjs(dataSource?.dateTime).format("HH:mm DD:MM:YY")}
        </div>
        <div className={classNames(styles._22, styles.item)}>DK hoàn thành</div>
        <div className={classNames(styles._23, styles.item)}>
          {dayjs(dataSource?.dateExpected).format("HH:mm DD:MM:YY")}
        </div>
        <div className={classNames(styles._24, styles.item)}></div>
        <div className={classNames(styles._25, styles.item)}>
          Khách hàng yêu cầu: {dataSource?.customerRequest}
        </div>
      </div>
      <Typo size="sub" style={{ padding: "10px 0" }}>
        Theo yêu cầu của quý khách và sau khi xem xét, chúng tôi hân hạnh báo
        giá sửa chữa như sau:
      </Typo>

      <div className="order-item-single bg pt-60">
        <div>
          {/* <div className="card text-left mb-40">
            <div className="card-body">
              <div className="row invoice-info">
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
          </div> */}
          <div className={styles.title}>
            <span>Chi tiết đơn hàng</span>
          </div>
          <TableBasic
            loading={false}
            columns={columns}
            data={dataSource?.orderDetails}
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
    </Container>
  );
}
