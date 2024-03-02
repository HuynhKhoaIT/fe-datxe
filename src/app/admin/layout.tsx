import { Fragment, ReactNode, Suspense, useState } from "react";
import Menu from "../components/profile-sidebar/Menu";
import styles from "./index.module.scss";
import { LoadingComponent } from "../components/loading";
import HeaderTop from "../layout/common/desktop/HeaderTop";
import dynamic from "next/dynamic";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";

import { Button } from "@mantine/core";
import HeaderTopMobile from "../layout/common/mobile/HeaderTopMobile";
interface IProps {
  children: ReactNode;
}
const DynamicMenu = dynamic(() => import("../layout/common/mobile/NavDrawer"), {
  ssr: false,
});
export default function AdminLayout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  return (
    <Fragment>
      {isMobile ? (
        <main>
          <HeaderTopMobile />
          <div className={styles.wrapperMobile}>
            <div className={styles.content}>{children}</div>
          </div>
        </main>
      ) : (
        <main>
          <HeaderTop />
          <div className={styles.wrapper}>
            <div className={styles.navBar}>
              <Menu />
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        </main>
      )}
    </Fragment>
  );
}
