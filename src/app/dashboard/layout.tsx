"use client";
import { ReactNode, Suspense } from "react";
import Menu from "../components/profile-sidebar/Menu";
import Header from "../components/page/header/header";
import { MyFooter } from "../components/page/footer/footer";
import { Navbar } from "../components/table/Navbar";
import {
  IconBellRinging,
  IconReceipt2,
  IconUser,
  IconBuildingStore,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
const data = [
  { link: "/dashboard", label: "Tổng quan", icon: IconBuildingStore },
  { link: "/dashboard/profile", label: "Hồ sơ của tôi", icon: IconUser },
  { link: "/dashboard/cars", label: "Danh sách xe", icon: IconBellRinging },
  { link: "/dashboard/order", label: "Đơn hàng", icon: IconReceipt2 },
];
interface IProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
  const pathname = usePathname();
  return (
    <>
      <Header />
      <main className="main">
        <div className="user-profile pt-40 pb-40">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <Navbar data={data} pathName={pathname} />
              </div>
              <div className="col-md-9">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <MyFooter />
    </>
  );
}
