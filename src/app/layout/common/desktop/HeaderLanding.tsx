import Link from "next/link";
import styles from "./Header.module.scss";
import facebook from "@/assets/icons/faceBook.svg";
import pintest from "@/assets/icons/pinterest.svg";
import instagram from "@/assets/icons/instagram.svg";
import Container from "@/app/components/common/Container";
import SigninButton from "@/app/layout/common/desktop/login-button";
import { Button } from "@mantine/core";
import logo from "@/assets/images/logo.png";
import Typo from "@/app/components/elements/Typo";

export default function HeaderLanding() {
  return (
    <Container>
      <div className={styles.headerLanding}>
        <Link href={"/"}>
          <img style={{ cursor: "pointer" }} src={logo.src} alt="" />
        </Link>
        <ul className={styles.navList}>
          <li>
            <Link href={"/"}>
              <Typo size="primary" type="bold" style={{ color: "#333333" }}>
                Trang chủ
              </Typo>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Typo size="primary" type="bold" style={{ color: "#333333" }}>
                Dịch vụ
              </Typo>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Typo size="primary" type="bold" style={{ color: "#333333" }}>
                Giới thiệu
              </Typo>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Typo size="primary" type="bold" style={{ color: "#333333" }}>
                Liên hệ
              </Typo>
            </Link>
          </li>
        </ul>
        <div className={styles.nav}>
          <Button
            size="lg"
            radius={0}
            variant="outline"
            color="var(--primary-color)"
            h={56}
          >
            Trở thành chuyên gia
          </Button>
          <Link href={"/dat-lich"}>
            <Button size="lg" radius={0} color="#3450E7" h={56}>
              Book Lịch
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
