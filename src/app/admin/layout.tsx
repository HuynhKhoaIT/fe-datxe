import { ReactNode, Suspense } from "react";
import Menu from "../components/profile-sidebar/Menu";
import HeaderAdmin from "../components/page/header/header-admin";
import { MyFooter } from "../components/page/footer/footer";
import styles from "./index.module.scss";
import { LoadingComponent } from "../components/loading";
import Header from "../components/page/header/header";
interface IProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.navBar}>
          <Menu />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
