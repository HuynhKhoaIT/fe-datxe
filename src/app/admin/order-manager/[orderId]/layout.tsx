import { Fragment, ReactNode, Suspense } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
interface IProps {
  children: ReactNode;
}

export default function CreateLayout({ children }: IProps) {
  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Quản lý đơn hàng", href: "/admin/order-manager" },
    { title: "Chi tiết đơn hàng" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      {children}
    </Fragment>
  );
}
