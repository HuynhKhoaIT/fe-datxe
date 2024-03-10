import { Fragment, ReactNode, Suspense } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";

interface IProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  const Breadcrumbs = [{ title: "Tổng quan" }];

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      {children}
    </Fragment>
  );
}
