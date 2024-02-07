import Link from "next/link";
import styles from "./Header.module.scss";
import facebook from "@/assets/icons/faceBook.svg";
import pintest from "@/assets/icons/pinterest.svg";
import instagram from "@/assets/icons/instagram.svg";
import Container from "@/app/components/common/Container";
import SigninButton from "@/app/layout/common/desktop/login-button";

export default function HeaderTop() {
  return (
    <div className={styles.headerTop}>
      <Container>
        <div className={styles.topWrapper}>
          <div className={styles.topLeft}>
            <Link href={""}>
              <img src={facebook.src} alt="Facebook Icon" />
            </Link>
            <Link href={""}>
              <img src={pintest.src} alt="{Pintest} Icon" />
            </Link>
            <Link href={""}>
              <img src={instagram.src} alt="Ig Icon" />
            </Link>
          </div>
          <div className={styles.topRight}>
            <Link href="" className={styles.title}>
              Kiểm tra lịch hẹn
            </Link>
            <SigninButton />
          </div>
        </div>
      </Container>
    </div>
  );
}
