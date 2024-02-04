import React from "react";
import styles from "./NavDrawer.module.scss";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Typo from "@/app/components/elements/Typo";
import IconClose from "@/assets/icons/close.svg";
const NavDrawer = ({
  open,
  onClose,
  direction = "left",
  children,
  headerTitle = "",
}: any) => {
  return (
    <Drawer
      open={open}
      style={{ backgroundColor: "#182029" }}
      onClose={onClose}
      direction={direction}
      className={styles.drawer}
    >
      <div className={styles.header}>
        <div className={styles.title}>
          {/* <ArrowLeft onClick={onClose}/> */}
          <Typo size="small">{headerTitle}</Typo>
        </div>
        <div className={styles.close}>
          <img src={IconClose.src} alt="" onClick={onClose} />
        </div>
      </div>
      {children}
    </Drawer>
  );
};

export default NavDrawer;
