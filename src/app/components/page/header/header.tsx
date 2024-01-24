import Link from "next/link";
import React from "react";
import SigninButton from "./login-button";
import SearchForm from "../../elements/search/Search";
import { getBrands } from "@/utils/branch";
import styles from "./Header.module.scss";
import Container from "../../common/Container";
import facebook from "@/assets/icons/faceBook.svg";
import pintest from "@/assets/icons/pinterest.svg";
import instagram from "@/assets/icons/instagram.svg";
import logo from "@/assets/images/banner.png";
import SearchFormName from "../../elements/search/SearchFormName";
import { Button } from "@mantine/core";
export default function Header() {
  return (
    // <header className="header">
    //   <div className="header-top">
    //     <div className="container">
    //       <div className="header-top-wrapper">
    //         <div className="header-top-left">
    //           <div className="header-top-contact">
    //             <ul>
    //               <li>
    //                 <Link href="mailto:info@example.com">info@example.com</Link>
    //               </li>
    //               <li>
    //                 <Link href="tel:+21236547898">
    //                   <IconPhoneCall size={18} /> +2 123 654 7898
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //         <div className="header-top-right">
    //           <SigninButton />
    //           <div className="header-top-social">
    //             <Link href="#">
    //               <IconBrandFacebook size={18} />
    //             </Link>
    //             <Link href="#">
    //               <IconBrandTwitter size={18} />
    //             </Link>
    //             <Link href="#">
    //               <IconBrandInstagram size={18} />
    //             </Link>
    //             <Link href="#">
    //               <IconBrandLinkedin size={18} />
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="main-navigation">
    //     <nav className="navbar navbar-expand-lg">
    //       <div className="container position-relative">
    //         <Link className="navbar-brand" href="/">
    //           <img
    //             className="rounded"
    //             src="https://datxe.com/wp-content/uploads/2021/08/cropped-logo-DatXE-App-vuong-1.jpg"
    //             alt="logo"
    //             style={{ maxWidth: "60px" }}
    //           />
    //         </Link>
    //         <div className="collapse navbar-collapse nav-search" id="main_nav">
    //           <SearchForm />
    //           <div className="nav-right">
    //             <div className="cart-btn">
    //               <Link href="/gio-hang" className="nav-right-link">
    //                 <IconShoppingCart />
    //                 <span>0</span>
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </nav>
    //   </div>
    // </header>
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Container>
          <div className={styles.topWrapper}>
            <div className={styles.topLeft}>
              <Link href={""}>
                <img src={facebook.src} alt="Facebook Icon" />
              </Link>
              <Link href={""}>
                <img src={pintest.src} alt="Facebook Icon" />
              </Link>
              <Link href={""}>
                <img src={instagram.src} alt="Facebook Icon" />
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
      <div className={styles.headerContent}>
        <Container>
          <div className={styles.headerSearch}>
            <Link href={"./"}>
              <img style={{ cursor: "pointer" }} src={logo.src} alt="" />
            </Link>
            <div className={styles.search}>
              <SearchFormName />
              <Button
                color="#EEF1F9"
                classNames={{ root: styles.btnAdd, inner: styles.innerAdd }}
              >
                Thêm xe
              </Button>
              <Button
                color="#3450E7"
                classNames={{ root: styles.btnBook, inner: styles.innerBook }}
              >
                Book Lịch
              </Button>
            </div>
          </div>
          <div className={styles.headerNav}></div>
        </Container>
      </div>
    </header>
  );
}
