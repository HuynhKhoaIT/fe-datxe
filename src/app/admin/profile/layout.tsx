import { ReactNode, Suspense } from "react";
import styles from "./index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
interface IProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Hồ sơ" },
  ];
  return (
    <main className={styles.wrapper}>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div className={styles.content}>{children}</div>
      <FooterAdmin />
    </main>
  );
}
