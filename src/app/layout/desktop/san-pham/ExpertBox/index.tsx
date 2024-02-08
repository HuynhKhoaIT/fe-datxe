import { IProduct } from "@/interfaces/product";
import styles from "./index.module.scss";
import Typo from "@/app/components/elements/Typo";
import Link from "next/link";
import avatar from "@/assets/images/avatar.png";
import IconFaceBook from "@/assets/icons/fbIcon.svg";
import IconInstagram from "@/assets/icons/igIcon.svg";

const ExpertBox = ({ ProductDetail }: { ProductDetail: IProduct }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img
          className={styles.avatarImg}
          src={ProductDetail?.garage?.logo || avatar.src}
          alt="avatar"
        />
      </div>
      <div>
        <div className={styles.headerInfo}>
          <div className={styles.leftInfo}>
            <Typo type="bold" style={{ color: "#170F49" }}>
              {ProductDetail?.garage?.name}
            </Typo>
            <Link
              href={`/chuyen-gia/${ProductDetail?.garage?.code}`}
              className={styles.toExpert}
            >
              Đi đến chuyên gia
            </Link>
          </div>
          <div className={styles.social}>
            <Link href={""}>
              <img src={IconFaceBook.src} />
            </Link>
            <Link href={""}>
              <img src={IconInstagram.src} />
            </Link>
          </div>
        </div>
        <Typo size="sub" style={{ color: "#6F6C90" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis sem
          eget erat posuere fringilla. Libero massa et diam faucibus nulla nisl
          dolor, ornare vel.
        </Typo>
      </div>
    </div>
  );
};
export default ExpertBox;
