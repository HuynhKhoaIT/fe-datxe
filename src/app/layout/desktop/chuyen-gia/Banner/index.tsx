import { BackgroundImage } from "@mantine/core";
import styles from "./index.module.scss";
import BannerImg from "@/assets/images/bannerExpert.png";
const Banner = () => {
  return (
    <div className={styles.wrapper}>
      <BackgroundImage
        h={295}
        src={BannerImg.src}
        radius="sm"
      ></BackgroundImage>
      <div className={styles.bg}></div>
    </div>
  );
};

export default Banner;
