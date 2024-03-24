"use client";
import React, { useState } from "react";
import { Box, Button, LoadingOverlay } from "@mantine/core";
import styles from "./CategoryCarouselList.module.scss";
import { CardCategory } from "@/app/layout/desktop/trang-chu/Category/CardCategory";
import Scroll from "../Scroll";
import Typo from "../../elements/Typo";
import { IconFilter } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const FilterCategories = ({ categories, shadow = false, loading }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCateory = searchParams.get("categoryId");
  return (
    <Box className="slick-mobile" mb={10}>
      <div className={styles.container}>
        {/* <div style={{ borderBottom: "1px solid #eeeeee" }}>
          <Typo size="18px" type="bold" className={styles.title}>
            <IconFilter />
            Lọc theo danh mục
          </Typo>
        </div> */}
        <div className={styles.content}>
          <Scroll>
            <Button
              variant={activeCateory ? "outline" : "filled"}
              color={activeCateory ? "gray" : "var(--primary-orange)"}
              onClick={() =>
                router.push(`${pathname}`, {
                  scroll: false,
                })
              }
            >
              Tất cả
            </Button>
            {categories?.map((item: any) => {
              return (
                <Button
                  variant={activeCateory === item.value ? "filled" : "outline"}
                  color={
                    activeCateory === item.value
                      ? "var(--primary-orange)"
                      : "gray"
                  }
                  onClick={() =>
                    router.push(`${pathname}?categoryId=${item.value}`, {
                      scroll: false,
                    })
                  }
                >
                  {item.label}
                </Button>
              );
            })}
          </Scroll>
        </div>
      </div>
    </Box>
  );
};

export default FilterCategories;
