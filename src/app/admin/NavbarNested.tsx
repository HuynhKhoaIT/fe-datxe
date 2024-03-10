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
} from "@tabler/icons-react";
import classes from "./NavbarNested.module.scss";
import { LinksGroup } from "../components/NavBarLinksGroup/NavBarLinksGroup";
import { IconUsersGroup } from "@tabler/icons-react";

const mockdata = [
  { link: "/admin", label: "Tổng quan", icon: IconGauge },
  {
    label: "Chuyên gia",
    icon: IconUsers,
    links: [
      { label: "Danh sách chuyên gia", link: "/admin/expert" },
      {
        label: "Chương trình của chuyên gia",
        link: "/admin/marketing-campaign",
      },
    ],
  },
  {
    label: "Đơn hàng",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Danh sách đơn hàng", link: "/admin/orders" },
      { label: "Quản lý đơn hàng", link: "/admin/order-manager" },
    ],
  },
  {
    label: "Sản phẩm",
    icon: IconCalendarStats,
    links: [
      { label: "Danh mục sản phẩm", link: "/admin/categories" },
      { label: "Sản phẩm trên sàn", link: "/admin/products" },
      { label: "Sản phẩm trong kho", link: "/admin/all-products" },
    ],
  },
  { link: "/admin/cars", label: "Danh sách xe", icon: IconCar },
  {
    link: "/admin/productBrand",
    label: "Danh sách thương hiệu",
    icon: IconAdjustments,
  },
  {
    link: "/admin/customers",
    label: "Danh sách khách hàng",
    icon: IconUsersGroup,
  },
];

export function NavbarNested() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
      {/* <div className={classes.footer}><UserButton /></div> */}
    </nav>
  );
}
