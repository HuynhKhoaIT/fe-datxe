import React from "react";

import styles from "./ListPage.module.scss";
import { Box } from "@mantine/core";
import Typo from "../elements/Typo";
import { IconFilter, IconList } from "@tabler/icons-react";

function ListPage({
  searchForm,
  actionBar,
  baseTable,
  loading = false,
  children,
  title,
  style,
  titleTable = false,
  isBoxShadow = true,
  filterCategory,
}: any) {
  return (
    <div className={styles.baseListPage} style={{ ...style }}>
      <div className={styles.title}>{title}</div>
      <div className={styles.baseListPageList}>
        <div className={styles.searchForm}>{searchForm}</div>
        {actionBar && <div className={styles.actionBar}>{actionBar}</div>}
        {filterCategory && (
          <div className={styles.filterCategory}>{filterCategory}</div>
        )}
        <div
          className={styles.baseTable}
          style={{ boxShadow: isBoxShadow ? "var(--box-shadow)" : "none" }}
        >
          {titleTable && (
            <div style={{ borderBottom: "1px solid #eeeeee" }}>
              <Typo size="18px" type="bold" className={styles.titleList}>
                <IconList size={22} />
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
