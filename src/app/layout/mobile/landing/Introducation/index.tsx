import Typo from "@/app/components/elements/Typo";
import { Button } from "@mantine/core";
import IconPlay from "@/assets/icons/play.svg";
import styles from "./index.module.scss";
const Introducation = () => {
  return (
    <div className={styles.wrapperBox}>
      <Typo
        type="bold"
        style={{
          color: "var(--title-white)",
          fontSize: "32px",
          textAlign: "center",
        }}
      >
        Đặt lịch sửa xe tại 63 tỉnh thành
      </Typo>
      <Typo
        size="primary"
        style={{ color: "var(--title-white)", textAlign: "center" }}
      >
        Không còn phải xếp hàng đợi sửa xe, biết trước giá dịch vụ, tiết kiệm
      </Typo>
      <Button
        size="lg"
        radius={0}
        leftSection={<img src={IconPlay.src} />}
        radius="lg"
        color="#6C00FF"
        h={38}
        w={158}
      >
        Xem video giới thiệu
      </Button>
    </div>
  );
};
export default Introducation;
