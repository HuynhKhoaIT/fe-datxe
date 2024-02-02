import classNames from "classnames";
import styles from "./index.module.scss";
import Typo from "@/app/components/elements/Typo";
import { Rating } from "@mantine/core";
import Avatar from "@/assets/images/avatar.png";
const ReviewItem = ({ dataDetail }: any) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={Avatar.src} />
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoUser}>
              <Typo size="tiny" type="bold">
                {dataDetail?.user?.name}
              </Typo>
              <div className={styles.star}>
                <Rating defaultValue={dataDetail?.star} />
                <Typo style={{ fontSize: "12px", color: "var(--sub-color)" }}>
                  {dataDetail?.created}
                </Typo>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.message}>{dataDetail?.message}</div>
    </div>
  );
};
export default ReviewItem;
