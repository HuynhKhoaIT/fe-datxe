import { ReactNode, Suspense } from "react";
import styles from "../index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
interface IProps {
  children: ReactNode;
}

export default function CreateLayout({ children }: IProps) {
  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Quản lý khách hàng", href: "/admin/customers" },
    { title: "Thêm khách hàng" },
  ];
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div className={styles.content}>{children}</div>
      <FooterAdmin />
    </div>
  );
}
