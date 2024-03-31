import React from "react";
import styles from "./FooterAdmin.module.scss";
export default function FooterAdmin() {
  return (
    <footer className={styles.appFooter}>
      <div>
        <strong>Đặt xe </strong>- © Copyright 2024.
      </div>
      <div className={styles.version}>version 1</div>
    </footer>
  );
}
