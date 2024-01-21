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
    { title: "Sản phẩm", href: "/admin/products" },
    { title: "Điều hướng sản phẩm" },
  ];
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div className={styles.content}>{children}</div>
      <FooterAdmin />
    </div>
  );
}
