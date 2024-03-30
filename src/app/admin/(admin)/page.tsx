"use client";
import React, { Fragment } from "react";
import Statistical from "../_component/Statistical";
import styles from "./index.module.scss";
import Chart from "../_component/chart";
import SellingProductListPage from "./SellingProductListPage";
import {
  IconCalendar,
  IconCar,
  IconReportAnalytics,
} from "@tabler/icons-react";
import Typo from "@/app/components/elements/Typo";
import { IconPhotoSensor } from "@tabler/icons-react";
import Scan from "@/assets/icons/scan.svg";
import Report from "@/assets/icons/report.svg";
import Car from "@/assets/icons/car_icon_126268.svg";
import Product from "@/assets/icons/product.svg";
import SP from "@/assets/icons/sp.svg";
import Marketing from "@/assets/icons/marketing.svg";
import Clock from "@/assets/icons/clock.svg";
import CarService from "@/assets/images/carService2.jpeg";
export default function DashboardAdmin() {
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
      action: "",
    },
    {
      id: 2,
      icon: Report.src,
      label: "Đơn hàng",
      link: "/admin/order-manager",
    },
    {
      id: 3,
      icon: Clock.src,
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
      link: "/admin/marketing",
    },
    {
      id: 7,
      icon: SP.src,
      label: "SP đường dẫn",
      link: "/admin/products",
    },
  ];
  return (
    <div className={styles.main}>
      {/* <Camera /> */}

      <div className={styles.card1}>
        <div className={styles.info}>
          <span className={styles.title}>Hiện đang có</span>
          <span className={styles.updating}>Đang cập nhật</span>
        </div>
        <div className={styles.boxMenu}>
          {menu?.map((item: any, index: number) => {
            const Icon = item.icon;
            return (
              <div className={styles.itemMenu} key={index}>
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
      <div className={styles.card_2}>
        <div className={styles.title_2}>
          <p>Thông tin xe ra vào {getCurrentMonthDates()}</p>
        </div>
        <div className={styles.imgCar}>
          <img src={CarService.src} />
        </div>
        <div className={styles.value}>
          <p>99</p>
        </div>
      </div>

      <Statistical />

      <Chart />
      {/* <SellingProductListPage /> */}
    </div>
  );
}
