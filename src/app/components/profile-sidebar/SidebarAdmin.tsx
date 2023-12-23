"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";
const SidebarAdmin = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  let page = parts[parts.length - 1];
  let pageUpdate = parts[2];
  return (
    <ul className="user-profile-sidebar-list">
      <li>
        <Link
          href="/admin"
          className={`list-group-item ${page == "admin" && "active"}`}
        >
          <i className="far fa-gauge-high"></i> Tổng quan
        </Link>
      </li>
      <li>
        <Link
          href="/admin/profile"
          className={`list-group-item ${page == "profile" && "active"}`}
        >
          <i className="far fa-user"></i> Hồ sơ của tôi
        </Link>
      </li>

      <li>
        <Link
          href="/admin/orders"
          className={`${page == "orders" && "active"}`}
        >
          <i className="far fa-plus-circle"></i> Đơn hàng
        </Link>
      </li>
      <li>
        <Link
          href="/admin/products"
          className={`list-group-item ${
            (page == "products" || pageUpdate == "products") && "active"
          }`}
        >
          <i className="far fa-layer-group"></i>Sản phẩm
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
