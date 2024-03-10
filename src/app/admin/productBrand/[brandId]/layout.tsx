import { ReactNode, Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";

interface IProps {
  children: ReactNode;
}
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Thương hiệu", href: "/admin/productBrand" },
  { title: "Cập nhật thương hiệu" },
];

export default function CreateLayout({ children }: IProps) {
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      {children}
    </Fragment>
  );
}
