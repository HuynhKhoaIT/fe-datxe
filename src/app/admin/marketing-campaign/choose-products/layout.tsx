import { Fragment, ReactNode, Suspense } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
interface IProps {
  children: ReactNode;
}
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Chương trình", href: "/admin/marketing-campaign" },
  { title: "Thêm chương trình" },
];
export default function CreateLayout({ children }: IProps) {
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div>{children}</div>
    </Fragment>
  );
}
