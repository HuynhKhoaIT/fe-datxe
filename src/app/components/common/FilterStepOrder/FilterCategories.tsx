"use client";
import React, { useState } from "react";
import { Box, Button, LoadingOverlay } from "@mantine/core";
import styles from "./CategoryCarouselList.module.scss";
import { CardCategory } from "@/app/layout/desktop/trang-chu/Category/CardCategory";
import Scroll from "../Scroll";
import Typo from "../../elements/Typo";
import { IconFilter } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const FilterStepOrder = ({ stepOptions, shadow = false, loading }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeStep = searchParams.get("step");
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
              variant={activeStep ? "outline" : "filled"}
              color={activeStep ? "gray" : "var(--primary-orange)"}
              onClick={() =>
                router.push(`${pathname}`, {
                  scroll: false,
                })
              }
            >
              Tất cả
            </Button>
            {stepOptions?.map((item: any) => {
              return (
                <Button
                  variant={activeStep === item.value ? "filled" : "outline"}
                  color={
                    activeStep === item.value ? "var(--primary-orange)" : "gray"
                  }
                  onClick={() =>
                    router.push(`${pathname}?step=${item.value}`, {
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

export default FilterStepOrder;
