import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import Image1 from "@/assets/images/showRoom/Image1.png";
import Image2 from "@/assets/images/showRoom/Image2.png";
import Image3 from "@/assets/images/showRoom/Image3.png";
import Image4 from "@/assets/images/showRoom/Image4.png";

const ImagesShowRoom = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Typo
          size="small"
          type="bold"
          style={{ color: "var(--category-name)" }}
        >
          Hình ảnh Showroom
        </Typo>
      </div>
      <div className={styles.body}>
        <div className={styles.top}>
          <img src={Image1.src} />
        </div>
        <div className={styles.bottom}>
          <img src={Image3.src} />
          <img src={Image4.src} />
        </div>
      </div>
    </div>
  );
};

export default ImagesShowRoom;
