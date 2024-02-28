"use client";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import Container from "@/app/components/common/Container";
import { Collapse, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Arror from "@/assets/icons/arrow-right-br.svg";
import { useState } from "react";
const DetailPage = ({ title, data }: any) => {
  const [opened, { toggle }] = useDisclosure(true);
  return (
    <Container>
      <>
        <div className={styles.itemFilter} onClick={toggle}>
          <Flex
            justify="space-between"
            align="center"
            className={styles.section}
          >
            <Typo type="bold" style={{ fontSize: "24px", color: "#242A2E" }}>
              {title}
            </Typo>
            <img
              src={Arror.src}
              className={styles.arrow}
              style={opened ? { transform: "rotate(270deg)" } : {}}
            />
          </Flex>
        </div>
        <Collapse in={opened} className={styles.lessonWrapper} mb={12}>
          <div className={styles.box}>
            <div className={styles.item}>
              {data?.children?.map((_item: any, _index: number) => {
                return (
                  <div key={_index} className={styles.right}>
                    <div className={styles.item}>
                      <div className={styles.logo}>
                        <img src={_item?.image} />
                      </div>
                      <div className={styles.info}>
                        <Typo
                          size="primary"
                          type="bold"
                          style={{ color: "#242A2E" }}
                        >
                          {_item?.title}
                        </Typo>
                        <Typo size="sub" style={{ color: "#383E43" }}>
                          {_item?.subTitle}
                        </Typo>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Collapse>
      </>
    </Container>
  );
};
export default DetailPage;
