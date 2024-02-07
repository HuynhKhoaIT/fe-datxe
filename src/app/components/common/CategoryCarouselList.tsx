import React from "react";
import { Box, LoadingOverlay } from "@mantine/core";
import Scroll from "./Scroll";
import styles from "./CategoryCarouselList.module.scss";
import { CardCategory } from "@/app/layout/desktop/trang-chu/Category/CardCategory";
const CategoryCarouselList = ({ categories, shadow = false, loading }: any) => {
  return (
    <Box className="slick-mobile" mb={10}>
      <div className={styles.container}>
        {/* <LoadingOverlay
          visible={loading}
          // zIndex={0}
          overlayProps={{ radius: "sm" }}
          loaderProps={{ type: "bars" }}
        /> */}
        <Scroll>
          {categories?.map((item: any) => {
            return <CardCategory key={item?.id} category={item} garageId={0} />;
          })}
        </Scroll>
      </div>
    </Box>
  );
};

export default CategoryCarouselList;
