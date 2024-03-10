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
          fontSize: "50px",
          textAlign: "center",
        }}
      >
        Tìm tất cả dịch vụ, sản phẩm dành riêng cho chiếc xe của bạn
      </Typo>
      <Typo
        size="sub"
        style={{ color: "var(--title-white)", textAlign: "center" }}
      >
        Bạn không còn phải lo khi tìm kiếm một địa chỉ sửa xe uy tín nữa. Tất cả
        đã được đội ngũ Chuyên Gia của DatXE giải quyết cho bạn.
      </Typo>
      <Button
        size="md"
        leftSection={<img src={IconPlay.src} />}
        radius="lg"
        color="#6C00FF"
        h={75}
        w={308}
      >
        Xem video giới thiệu
      </Button>
    </div>
  );
};
export default Introducation;
