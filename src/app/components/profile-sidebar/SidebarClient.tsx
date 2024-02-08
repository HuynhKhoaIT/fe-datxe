"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";
import styles from "./index.module.scss";
const SidebarClient = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  let page = parts[parts.length - 1];
  return (
    <ul className={styles.listMenu}>
      <li>
        <Link
          href="/dashboard"
          className={`list-group-item ${page == "dashboard" && "active"}`}
        >
          <i className="far fa-gauge-high"></i> Tổng quan
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/profile"
          className={`list-group-item ${page == "profile" && "active"}`}
        >
          <i className="far fa-user"></i> Hồ sơ của tôi
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/cars"
          className={`list-group-item ${
            (page == "cars" || page == "add-car") && "active"
          }`}
        >
          <i className="far fa-layer-group"></i> Danh sách xe
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/order"
          className={`${page == "order" && "active"}`}
        >
          <i className="far fa-plus-circle"></i> Đơn hàng
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
export { SidebarClient };
