import { ReactNode, Fragment } from "react";
import styles from "../index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
interface IProps {
  children: ReactNode;
}
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Sản phẩm", href: "/admin/products" },
  { title: "Điều hướng sản phẩm" },
];

export default function CreateLayout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  return (
    <Fragment>
      {isMobile ? (
        <div className={styles.wrapper}>
          <Breadcrumb breadcrumbs={Breadcrumbs} />
          <div className={styles.content}>{children}</div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <Breadcrumb breadcrumbs={Breadcrumbs} />
          <div className={styles.content}>{children}</div>
          <FooterAdmin />
        </div>
      )}
    </Fragment>
  );
}
