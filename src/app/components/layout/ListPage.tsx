import React from "react";

import styles from "./ListPage.module.scss";
import { Box } from "@mantine/core";
import Typo from "../elements/Typo";
import { IconFilter } from "@tabler/icons-react";

function ListPage({
  searchForm,
  actionBar,
  baseTable,
  loading = false,
  children,
  title,
  style,
  padding = 0,
  titleTable = false,
}: any) {
  return (
    <div className={styles.baseListPage} style={{ padding: padding, ...style }}>
      <div className={styles.title}>{title}</div>
      <div className={styles.baseListPageList}>
        <div className={styles.searchForm}>{searchForm}</div>
        {actionBar && <div className={styles.actionBar}>{actionBar}</div>}
        <div className={styles.baseTable}>
          {titleTable && (
            <div style={{ borderBottom: "1px solid #eeeeee" }}>
              <Typo
                size="18px"
                type="bold"
                style={{ color: "var(--primary-orange)", padding: "16px 30px" }}
              >
                <IconFilter size={22} />
                Danh sách
              </Typo>
            </div>
          )}

          <div className={styles.table}>{baseTable}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default ListPage;
