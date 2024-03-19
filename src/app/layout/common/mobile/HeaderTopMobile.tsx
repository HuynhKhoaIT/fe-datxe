"use client";
import Link from "next/link";
import styles from "./HeaderTopMobile.module.scss";
import facebook from "@/assets/icons/faceBook.svg";
import pintest from "@/assets/icons/pinterest.svg";
import instagram from "@/assets/icons/instagram.svg";
import Container from "@/app/components/common/Container";
import SigninButton from "@/app/layout/common/desktop/login-button";
import dynamic from "next/dynamic";
import { IconCategory } from "@tabler/icons-react";
import { useState } from "react";
import logo from "@/assets/images/logo.png";

import { SidebarAdmin } from "@/app/components/profile-sidebar/SidebarAdmin";
import { usePathname } from "next/navigation";
import { SidebarClient } from "@/app/components/profile-sidebar/SidebarClient";
const DynamicMenu = dynamic(() => import("./NavDrawer"), {
  ssr: false,
});
export default function HeaderTopMobile() {
  const [openNav, setOpenNav] = useState(false);
  const pathname = usePathname();
  const parts = pathname.split("/");
  let page = parts[1];
  return (
    <div className={styles.headerTop}>
      <Container>
        <div className={styles.topWrapper}>
          <div className={styles.topLeft}>
            <div
              className={styles.menu}
              onClick={() => {
                setOpenNav(true);
              }}
            >
              <IconCategory size={34} color="#fff" />
            </div>
          </div>
          <div className={styles.topRight}>
            <div className={styles.logo}>
              <Link href={"/"}>
                <img src={logo.src} alt="logo" />
              </Link>
            </div>
          </div>
        </div>
        <DynamicMenu
          open={openNav}
          onClose={() => setOpenNav(false)}
          headerTitle="Menu"
        >
          <ul className={styles.nav}>
            {page ? <SidebarClient /> : <SidebarAdmin />}
          </ul>
        </DynamicMenu>
      </Container>
    </div>
  );
}
