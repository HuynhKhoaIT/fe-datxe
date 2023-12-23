import { ReactNode, Suspense } from "react";
import Menu from "../components/profile-sidebar/Menu";
import HeaderAdmin from "../components/page/header/header-admin";
import { MyFooter } from "../components/page/footer/footer";
import styles from "./index.module.scss";
interface IProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: IProps) {
  return (
    <>
      <HeaderAdmin />
      <main className="main">
        <div className={styles.wrapper}>
          <div className={styles.navBar}>
            <Menu />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </main>
      <MyFooter />
    </>
  );
}
