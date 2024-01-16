import React from "react";
import Box from "../common/Box";
import classNames from "classnames";
import styles from "./OverviewPannel.module.scss";
import Link from "next/link";
function OverviewPanel({
  title,
  linkToList,
  children,
  showHeader = true,
  className,
  hiddenShowMore = false,
}: any) {
  return (
    <Box className={classNames(styles.panel, className)}>
      {showHeader && (
        <>
          <div className={styles.head}>
            <div className={styles.title}>{title}</div>
            {!hiddenShowMore && (
              <Link className={styles.showMore} href={linkToList}>
                Xem thêm
              </Link>
            )}
          </div>
        </>
      )}
      <div className={styles.content}>{children}</div>
    </Box>
  );
}

function Carousel({ children, className }: any) {
  return (
    <div className={classNames(styles.carousel, className)}>{children}</div>
  );
}

export default Object.assign(OverviewPanel, { Carousel });
