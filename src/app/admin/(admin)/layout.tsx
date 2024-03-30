import { Fragment, ReactNode, Suspense } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";

interface IProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  return <Fragment>{children}</Fragment>;
}
