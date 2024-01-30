import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Button } from "@mantine/core";
export default function Advertisement() {
  return (
    <div className={styles.flex}>
      <div className={styles.itemCard1}>
        <div className={styles.info}>
          <Typo className={styles.title}>
            Ưu đãi dịch vụ Rửa xe{" "}
            <span style={{ fontWeight: "600" }}>giảm 20%</span>
          </Typo>
          <Button color="#421E98">Đặt lịch</Button>
        </div>
      </div>
      <div className={styles.itemCard2}>
        <div className={styles.info}>
          <Typo className={styles.title}>
            Ưu đãi dịch vụ Độ xe{" "}
            <span style={{ fontWeight: "600" }}>giảm 20%</span>
          </Typo>
          <Button color="#FFDF7A" style={{ color: "#421E98" }}>
            Độ ngay
          </Button>
        </div>
      </div>
    </div>
  );
}
