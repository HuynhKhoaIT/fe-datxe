"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  IconBrandProducthunt,
  IconCar,
  IconCategory,
  IconClipboardData,
  IconClipboardText,
  IconHome,
  IconHotelService,
  IconLogout,
  IconReportMoney,
  IconSquareLetterA,
  IconSquareLetterB,
  IconSquareLetterG,
  IconSquareLetterS,
  IconUserCircle,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import styles from "./index.module.scss";
const SidebarAdmin = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  let page = parts[parts.length - 1];
  let pageUpdate = parts[2];
  return (
    <ul className={styles.listMenu}>
      <li>
        <Link
          href="/admin"
          className={`list-group-item ${page == "admin" && styles.active}`}
        >
          <IconHome /> Tổng quan
        </Link>
      </li>
      <li>
        <Link
          href="/admin/profile"
          className={`list-group-item ${page == "profile" && styles.active}`}
        >
          <IconUserCircle /> Hồ sơ của tôi
        </Link>
      </li>
      <li>
        <Link
          href="/admin/expert"
          className={`list-group-item ${page == "expert" && styles.active}`}
        >
          <IconUsers /> Quản lý chuyên gia
        </Link>
      </li>
      <li>
        <Link
          href="/admin/utilities"
          className={`list-group-item ${page == "utilities" && styles.active}`}
        >
          <IconHotelService /> Tiện ích lân cận
        </Link>
      </li>
      <li>
        <Link
          href="/admin/marketing-campaign"
          className={`list-group-item ${
            page == "marketing-campaign" && styles.active
          }`}
        >
          <IconReportMoney /> Chương trình của chuyên gia
        </Link>
      </li>
      <li>
        <Link
          href="/admin/orders"
          className={`${page == "orders" && styles.active}`}
        >
          <IconClipboardText /> Đơn hàng
        </Link>
      </li>
      <li>
        <Link
          href="/admin/order-manager"
          className={`${page == "order-manager" && styles.active}`}
        >
          <IconClipboardData /> Quản lý đơn hàng
        </Link>
      </li>
      <li>
        <Link
          href="/admin/products"
          className={`list-group-item ${
            (page == "products" || pageUpdate == "products") && styles.active
          }`}
        >
          <IconBrandProducthunt /> Sản phẩm trên sàn
        </Link>
      </li>
      <li>
        <Link
          href="/admin/all-products"
          className={`list-group-item ${
            (page == "all-products" || pageUpdate == "all-products") &&
            styles.active
          }`}
        >
          <IconCar /> Sản phẩm trong kho
        </Link>
      </li>
      <li>
        <Link
          href="/admin/categories"
          className={`list-group-item ${
            (page == "categories" || pageUpdate == "categories") &&
            styles.active
          }`}
        >
          <IconCategory /> Danh mục sản phẩm
        </Link>
      </li>
      <li>
        <Link
          href="/admin/suppliers"
          className={`list-group-item ${
            (page == "suppliers" || pageUpdate == "suppliers") && styles.active
          }`}
        >
          <IconSquareLetterS /> Nhà cung cấp
        </Link>
      </li>
      <li>
        <Link
          href="/admin/productBrand"
          className={`list-group-item ${
            (page == "productBrand" || pageUpdate == "productBrand") &&
            styles.active
          }`}
        >
          <IconSquareLetterB /> Thương hiệu
        </Link>
      </li>
      <li>
        <Link
          href="/admin/cars"
          className={`list-group-item ${
            (page == "cars" || pageUpdate == "cars") && styles.active
          }`}
        >
          <IconCar /> Quản lý xe
        </Link>
      </li>
      <li>
        <Link
          href="/admin/customers"
          className={`list-group-item ${
            (page == "customers" || pageUpdate == "customers") && styles.active
          }`}
        >
          <IconUsersGroup /> Quản lý khách hàng
        </Link>
      </li>
      <li>
        <Link
          style={{ display: "flex", alignItems: "center" }}
          href={"/"}
          onClick={() => signOut()}
        >
          <IconLogout size={20} />
          <p style={{ marginLeft: "8px" }}>Đăng Xuất</p>
        </Link>
      </li>
    </ul>
  );
};
export { SidebarAdmin };
