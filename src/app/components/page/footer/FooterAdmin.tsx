import styles from "./FooterAdmin.module.scss";
import React from "react";
export default function FooterAdmin() {
  return (
    <footer className={styles.appFooter}>
      <div>
        <strong>Đặt Lịch </strong>- © Copyright {new Date().getFullYear()}. All
        Rights Reserved.
      </div>
      <div className={styles.version}>version 1</div>
    </footer>
  );
}
