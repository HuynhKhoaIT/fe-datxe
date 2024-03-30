"use client";
import { Group, Code, ScrollArea, rem } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconLogout,
  IconUsers,
  IconCar,
  IconClipboard,
} from "@tabler/icons-react";
import classes from "./NavbarNested.module.scss";
import { LinksGroup } from "../components/NavBarLinksGroup/NavBarLinksGroup";
import { IconUsersGroup } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import FooterAdmin from "../layout/common/desktop/Footer/footer-admin";

const mockdata = [
  { link: "/admin", label: "Tổng quan", icon: IconGauge },
  {
    label: "Đơn hàng",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Danh sách đơn hàng", link: "/admin/order-manager" },
      { label: "Công việc & Lịch hẹn", link: "/admin/orders" },
    ],
  },

  {
    label: "Sản phẩm",
    icon: IconCalendarStats,
    links: [
      { label: "Danh sách sản phẩm", link: "/admin/products" },
      // { label: "Sản phẩm trong kho", link: "/admin/all-products" },
      { label: "Danh mục", link: "/admin/categories" },
    ],
  },
  { link: "/admin/blogs", label: "Danh sách bài viết", icon: IconClipboard },

  { link: "/admin/cars", label: "Danh sách xe", icon: IconCar },
  // {
  //   link: "/admin/productBrand",
  //   label: "Thương hiệu",
  //   icon: IconAdjustments,
  // },
  {
    link: "/admin/customers",
    label: "Khách hàng",
    icon: IconUsersGroup,
  },
  { link: "/admin/marketing-campaign", label: "Marketing", icon: IconGauge },
  {
    label: "Chuyên gia",
    icon: IconUsers,
    links: [{ label: "Danh sách chuyên gia", link: "/admin/expert" }],
  },
];

export function NavbarNested({ toggle }: any) {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} toggle={toggle} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      <div className={classes.footer}>
        <FooterAdmin />
      </div>
    </nav>
  );
}
