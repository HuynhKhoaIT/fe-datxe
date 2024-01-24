"use client";
import React from "react";
import styles from "./index.module.scss";
import image from "@/assets/images/banner.png";
import { BackgroundImage, Center, Text } from "@mantine/core";

const CarouselItem = ({ item }: any) => {
  return (
    <div className={styles.card}>
      <Center>
        <BackgroundImage
          src={item?.image ? item?.image : image}
          radius="md"
          h={"720px"}
          //   fit="cover"
          onClick={() =>
            item?.action == 1 && item?.url && window.open(`${item?.url}`)
          }
          className={styles.cursorPointer}
        ></BackgroundImage>
      </Center>
    </div>
  );
};

export default CarouselItem;
