"use client";
import { Box, Card } from "@mantine/core";
import styles from "./Convenient.module.scss";
import Link from "next/link";
import ImageField from "@/app/components/form/ImageField";
import Typo from "@/app/components/elements/Typo";
const ConvenientItem = ({ convenient }: any) => {
  return (
    <div className={styles.wrapper}>
      <Box w={"100%"}>
        <div className={styles.card}>
          <div>
            <Link href="" style={{ width: "100%" }}>
              <ImageField
                src={convenient?.image ? convenient?.image : null}
                height={"222"}
                width={266}
              />
            </Link>
          </div>

          <div className={styles.infoCard}>
            <Link href="">
              <Typo
                size="small"
                type="bold"
                style={{ color: "var(--title-white)" }}
                className={styles.productName}
              >
                {convenient?.name}
              </Typo>
            </Link>
            <Typo
              size="sub"
              style={{ color: "var(--title-white)" }}
              className={styles.description}
            >
              {convenient?.properties} properties
            </Typo>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default ConvenientItem;
