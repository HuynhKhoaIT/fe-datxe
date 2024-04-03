"use client";
import React, { Fragment } from "react";
import styles from "./index.module.scss";
import Chart from "../_component/chart";
import Typo from "@/app/components/elements/Typo";
import Scan from "@/assets/icons/scan.svg";
import Report from "@/assets/icons/record-svgrepo-com.svg";
import Car from "@/assets/icons/car-steering-wheel-svgrepo-com.svg";
import Product from "@/assets/icons/product.svg";
import SP from "@/assets/icons/sp.svg";
import Marketing from "@/assets/icons/analysis-comparison-svgrepo-com.svg";
import Calendar from "@/assets/icons/calendar-svgrepo-com.svg";
import CarService from "@/assets/images/carService2.jpeg";
import { useRouter } from "next/navigation";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { useAdmin } from "../hooks/admin/useAdmin";
import { ORDER_ACCEPT, ORDER_CANCEL, ORDER_DONE } from "@/constants";
export default function DashboardAdmin() {
  const {
    ordersAdmin,
    isLoading,
    newArray,
    arrayDate,
    isFetching,
  } = useAdmin();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );

  function getCurrentMonthDates() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    const formattedFirstDay = formatDate(firstDayOfMonth);
    const formattedLastDay = formatDate(lastDayOfMonth);

    return `${formattedFirstDay} - ${formattedLastDay}`;
  }

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const menu = [
    {
      id: 1,
      icon: Scan.src,
      label: "Tiếp nhận",
      action: openModal,
    },
    {
      id: 2,
      icon: Report.src,
      label: "Đơn hàng",
      link: "/admin/order-manager",
    },
    {
      id: 3,
      icon: Calendar.src,
      label: "Lịch hẹn",
      link: "/admin/orders",
    },
    {
      id: 4,
      icon: Product.src,
      label: "Thêm sp/dv",
      link: "/admin/products/create",
    },
    {
      id: 5,
      icon: Car.src,
      label: "Thêm xe",
      link: "/admin/cars/create",
    },
    {
      id: 6,
      icon: Marketing.src,
      label: "Chương trình",
      link: "/admin/marketing-campaign",
    },
    {
      id: 7,
      icon: SP.src,
      label: "SP đường dẫn",
      link: "/admin/products",
    },
  ];

  const card_3 = [
    {
      label: "Nghiệm thu",
      value: 39,
      id: 1,
    },
    {
      label: "Xuất xưởng",
      value: 60,
      id: 2,
    },
    {
      label: "Xe huỷ",
      value: 0,
      id: 3,
    },
  ];
  return (
    <div className={styles.main}>
      <div className={styles.wrapper_1}>
        <div className={styles.card1}>
          <div className={styles.info}>
            <span className={styles.title}>Hiện đang có</span>
            <span className={styles.updating}>Đang cập nhật</span>
          </div>
          <div className={styles.boxMenu}>
            {menu?.map((item: any, index: number) => {
              const Action = item?.action;

              return (
                <div
                  onClick={() => {
                    if (item?.link) {
                      router.push(item.link);
                    }
                    if (item?.action) {
                      Action();
                    }
                  }}
                  className={styles.itemMenu}
                  key={index}
                >
                  <div className={styles.iconMenu}>
                    {/* <Icon size={40} stroke={1} /> */}
                    <img src={item.icon} />
                  </div>
                  <span className={styles.titleItem}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.wrapper_2}>
        <div style={{ borderBottom: "1px solid #eeeeee" }}>
          <Typo size="18px" type="bold" className={styles.title_2}>
            Thông tin xe ra vào {getCurrentMonthDates()}
          </Typo>
        </div>
        <div className={styles.card_2}>
          <div className={styles.imgCar}>
            <img src={CarService.src} />
          </div>
          <div className={styles.value}>
            <p>{newArray?.length}</p>
          </div>
        </div>
      </div>

      {isMobile && (
        <div className={styles.card_3}>
          <div className={styles.item_card}>
            <p>Nghiệm thu</p>
            <span className={styles.value_3}>
              {
                newArray?.filter((item: any) => item?.step === ORDER_ACCEPT)
                  ?.length
              }
            </span>
          </div>
          <div className={styles.item_card}>
            <p>Xuất xưởng</p>
            <span className={styles.value_3}>
              {
                newArray?.filter((item: any) => item?.step === ORDER_DONE)
                  ?.length
              }
            </span>
          </div>
          <div className={styles.item_card}>
            <p>Xe huỷ</p>
            <span className={styles.value_3}>
              {
                newArray?.filter((item: any) => item?.step === ORDER_CANCEL)
                  ?.length
              }
            </span>
          </div>
        </div>
      )}

      <Chart
        isLoading={isLoading || isFetching}
        data={newArray}
        arrayDate={arrayDate}
      />
      {openedModal && (
        <DynamicModalAcceptCart openModal={openedModal} close={closeModal} />
      )}
      {/* <SellingProductListPage /> */}
      {isMobile && (
        <footer className={styles.appFooter}>
          <div>
            <strong>DatXE - Ứng dụng đặt lịch sửa xe </strong>
          </div>
        </footer>
      )}
    </div>
  );
}

const DynamicModalAcceptCart = dynamic(
  () => import("./_component/ModalAcceptCar"),
  {
    ssr: false,
  }
);
