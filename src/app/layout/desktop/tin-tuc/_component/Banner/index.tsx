import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { Flex, Image, LoadingOverlay, Title } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";

const Banner = ({ data, loading }: any) => {
  const breadScrumbs = [
    { name: "Trang chủ", path: "/", active: true },
    { name: "Tại sao bạn nên học tại Life Uni?", path: "/news", active: true },
    {},
    // { name: data?.title, path: '/', active: true },
  ];
  return (
    <div className={styles.container}>
      <div className={classNames("container", styles.content)}>
        <Typo type={"bold"} className={styles.title}>
          {data?.title}
        </Typo>
        <div>
          <Title
            fw="400"
            size="18px"
            c="var(--text-color-light)"
            className={styles.breadscrumbs}
          >
            {" Chủ đề "} {data?.category?.name}
          </Title>
          <Flex>
            {/* <div style={{ marginTop:5, fontSize:'20px', fontWeight: 500, color:'white' }}>{data?.title}</div> */}
            <div className={styles.breadscrumblast}>{data?.title}</div>
          </Flex>
        </div>
      </div>
      <LoadingOverlay
        visible={loading}
        zIndex={10}
        overlayProps={{ radius: "sm" }}
        loaderProps={{ type: "bars" }}
      />
      <Image
        src={data?.thumbnail}
        alt=""
        className={styles.banner}
        // h={'100%'}
        // mih={400}
      ></Image>
    </div>
  );
};

export default Banner;
