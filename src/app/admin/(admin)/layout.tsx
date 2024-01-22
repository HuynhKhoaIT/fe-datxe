import { ReactNode, Suspense } from "react";
import styles from "./index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
interface IProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  const Breadcrumbs = [{ title: "Tổng quan" }];
  return (
    <main className={styles.wrapper}>
      <div className={styles.contents}>
        <Breadcrumb breadcrumbs={Breadcrumbs} />
        <div className={styles.content}>{children}</div>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <FooterAdmin />
      </div>
    </main>
  );
}
