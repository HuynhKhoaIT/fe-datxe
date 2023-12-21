"use client";
import { ReactNode, Suspense } from "react";
import Menu from "../components/profile-sidebar/Menu";
import HeaderAdmin from "../components/page/header/header-admin";
import { MyFooter } from "../components/page/footer/footer";
import { Navbar } from "../components/table/Navbar";
import styles from "./index.module.scss";
import {
  IconBellRinging,
  IconReceipt2,
  IconUser,
  IconBuildingStore,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
interface IProps {
  children: ReactNode;
}
const data = [
  { link: "/admin", label: "Tổng quan", icon: IconBuildingStore },
  { link: "/admin/ho-so", label: "Hồ sơ", icon: IconUser },
  { link: "/admin/orders", label: "Đơn hàng", icon: IconBellRinging },
  { link: "/admin/products", label: "Sản phẩm", icon: IconReceipt2 },
];
export default function DashboardLayout({ children }: IProps) {
  const pathname = usePathname();
  return (
    <>
      <HeaderAdmin />
      <main className="main">
        <div className={styles.wrapper}>
          <div className={styles.navBar}>
            <Navbar data={data} pathName={pathname} />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </main>
      <MyFooter />
    </>
  );
}
