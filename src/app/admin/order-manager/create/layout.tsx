import { ReactNode, Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
interface IProps {
  children: ReactNode;
}
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Quản lý đơn hàng", href: "/admin/order-manager" },
  { title: "Thêm đơn hàng" },
];

export default function CreateLayout({ children }: IProps) {
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      {children}
    </Fragment>
  );
}
