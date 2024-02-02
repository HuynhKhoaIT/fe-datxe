import React from "react";
import Box from "../common/Box";
import classNames from "classnames";
import styles from "./OverviewPannel.module.scss";
import Link from "next/link";
import { Button } from "@mantine/core";
import ArrowRight from "@/assets/icons/arrow-right.svg";
function OverviewPanel({
  title,
  linkToList,
  children,
  showHeader = true,
  className,
  hiddenShowMore = false,
  stylesProps,
  subTitle,
  fullWidth,
}: any) {
  if (fullWidth) {
    return (
      <div className={classNames(styles.panel, className)}>
        {showHeader && (
          <Box>
            <div className={styles.head}>
              <div className={styles.left}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subTitle}>{subTitle}</div>
              </div>
              {!hiddenShowMore && (
                <Link className={styles.showMore} href={linkToList}>
                  <Button
                    variant="outline"
                    color={"var(--blue-color)"}
                    rightSection={<img src={ArrowRight.src} />}
                  >
                    Xem thêm
                  </Button>
                </Link>
              )}
            </div>
          </Box>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
  return (
    <Box
      className={classNames(styles.panel, className)}
      stylesProps={stylesProps}
    >
      {showHeader && (
        <>
          <div className={styles.head}>
            <div className={styles.left}>
              <div className={styles.title}>{title}</div>
              <div className={styles.subTitle}>{subTitle}</div>
            </div>
            {!hiddenShowMore && (
              <Link className={styles.showMore} href={linkToList}>
                <Button
                  variant="outline"
                  color={"var(--blue-color)"}
                  rightSection={<img src={ArrowRight.src} />}
                >
                  Xem thêm
                </Button>
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
