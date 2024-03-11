"use client";
import React from "react";
import { Breadcrumbs, Anchor } from "@mantine/core";
import Link from "next/link";
import styles from "./Breadcrumbs.module.scss";
import IconArrow from "@/assets/icons/arrow-right-br.svg";
export default function Breadcrumb({ breadcrumbs }: any) {
  const items = breadcrumbs.map((item: any, index: number) => {
    if (item?.href) {
      return (
        <Link href={item.href} key={index}>
          <span
            style={{
              color: "var(--primary-orange)",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {item.title}
          </span>
        </Link>
      );
    } else {
      return (
        <span key={index} style={{ fontSize: 18, fontWeight: 500 }}>
          {item.title}
        </span>
      );
    }
  });

  return (
    <div className={styles.breadcrumbs}>
      <Breadcrumbs fs={"lg"} separator={<img src={IconArrow.src} />}>
        {items}
      </Breadcrumbs>
    </div>
  );
}
