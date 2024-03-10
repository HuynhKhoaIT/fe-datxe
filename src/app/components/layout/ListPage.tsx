import React from "react";

import styles from "./ListPage.module.scss";
import { Box } from "@mantine/core";

function ListPage({
  searchForm,
  actionBar,
  baseTable,
  loading = false,
  children,
  title,
  style,
  padding = 30,
}: any) {
  return (
    <div className={styles.baseListPage} style={{ padding: padding, ...style }}>
      <div className={styles.title}>{title}</div>
      <div className={styles.baseListPageList}>
        <div className={styles.searchForm}> {searchForm}</div>
        <div className={styles.actionBar}>{actionBar}</div>
        <div className={styles.baseTable}>{baseTable}</div>
      </div>
      {children}
    </div>
  );
}

export default ListPage;
