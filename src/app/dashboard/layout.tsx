import { ReactNode, Fragment } from "react";
import Menu from "../components/profile-sidebar/Menu";
import Header from "../layout/common/desktop/HeaderDesktop";
import { MyFooter } from "../layout/common/desktop/Footer/FooterDesktop";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import styles from "./index.module.scss";
import FooterMobile from "../layout/common/mobile/Footer/FooterMobile";
import HeaderMobile from "../layout/common/mobile/HeaderMobile";

interface IProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  return (
    <Fragment>
      {isMobile ? (
        <main>
          <HeaderMobile />
          <div className={styles.wrapperMobile}>
            <div className={styles.content}>{children}</div>
          </div>
          <FooterMobile />
        </main>
      ) : (
        <main>
          <Header />
          <div className={styles.wrapper}>
            <div className={styles.navBar}>
              <Menu />
            </div>
            <div className={styles.content}>{children}</div>
          </div>
          <MyFooter />
        </main>
      )}
    </Fragment>
  );
}
