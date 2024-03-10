import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Button } from "@mantine/core";
import oto1 from "@/assets/images/oto1.png";
import oto2 from "@/assets/images/oto2.png";
import Container from "@/app/components/common/Container";

export default function Advertisement() {
  return (
    <Container>
      <div className={styles.flex}>
        <div className={styles.itemCard1}>
          <div className={styles.info}>
            <Typo className={styles.title}>
              Ưu đãi dịch vụ Rửa xe{" "}
              <span style={{ fontWeight: "600" }}>giảm 20%</span>
            </Typo>
            <Button size="lg" radius={0} color="#421E98">
              Đặt lịch
            </Button>
          </div>
          <div className={styles.img}>
            <img src={oto1.src} alt="oto" />
          </div>
        </div>
        <div className={styles.itemCard2}>
          <div className={styles.info}>
            <Typo className={styles.title}>
              Ưu đãi dịch vụ Độ xe{" "}
              <span style={{ fontWeight: "600" }}>giảm 20%</span>
            </Typo>
            <Button
              size="lg"
              radius={0}
              color="#FFDF7A"
              style={{ color: "#421E98" }}
            >
              Độ ngay
            </Button>
          </div>
          <div className={styles.img}>
            <img src={oto2.src} alt="oto" />
          </div>
        </div>
      </div>
    </Container>
  );
}
