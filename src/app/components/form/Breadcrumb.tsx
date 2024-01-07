import React from "react";
import { Breadcrumbs, Anchor } from "@mantine/core";
import Link from "next/link";
import styles from "./Breadcrumbs.module.scss";
export default function Breadcrumb({ breadcrumbs }: any) {
  const items = breadcrumbs.map((item: any, index: number) => {
    if (item?.href) {
      return (
        <Link href={item.href} key={index}>
          <span style={{ color: "#228BE6" }}>{item.title}</span>
        </Link>
      );
    } else {
      return <span>{item.title}</span>;
    }
  });

  return (
    <div className={styles.breadcrumbs}>
      <Breadcrumbs>{items}</Breadcrumbs>
    </div>
  );
}
