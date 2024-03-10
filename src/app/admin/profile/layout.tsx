import { Fragment, ReactNode, Suspense } from "react";
import styles from "./index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
interface IProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  const Breadcrumbs = [{ title: "Tổng quan" }];
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  return (
    <Fragment>
      {isMobile ? (
        <main className={styles.wrapper}>
          <div className={styles.contents}>
            <Breadcrumb breadcrumbs={Breadcrumbs} />
            <div className={styles.content}>{children}</div>
          </div>
        </main>
      ) : (
        <main className={styles.wrapper}>
          <div className={styles.contents}>
            <Breadcrumb breadcrumbs={Breadcrumbs} />
            <div className={styles.content}>{children}</div>
          </div>
          <div style={{ marginLeft: "20px" }}></div>
        </main>
      )}
    </Fragment>
  );
}
