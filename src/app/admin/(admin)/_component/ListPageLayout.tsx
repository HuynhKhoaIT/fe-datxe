"use client";
import React from "react";
import styles from "./ListPageLayout.module.scss";
export default function ListPageLayout({ children }: any) {
  return <div className={styles.wrapper}>{children}</div>;
}
