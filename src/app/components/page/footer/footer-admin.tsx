import React from "react";
import styles from "./FooterAdmin.module.scss";
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
