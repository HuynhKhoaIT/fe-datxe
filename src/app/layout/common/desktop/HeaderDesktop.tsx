import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import { Button } from "@mantine/core";
import car from "@/assets/icons/car.svg";
import HeaderTop from "./HeaderTop";
import Container from "@/app/components/common/Container";
import SearchFormName from "@/app/components/elements/search/SearchFormName";
export default function Header() {
  const brandData = [
    {
      id: "1",
      name: "VinFast",
    },
    {
      id: "2",
      name: "Toyota",
    },
    {
      id: "3",
      name: "BMW",
    },
    {
      id: "4",
      name: "Meceder",
    },
    {
      id: "5",
      name: "Audi",
    },
    {
      id: "6",
      name: "Fort",
    },
    {
      id: "7",
      name: "Honda",
    },
    {
      id: "8",
      name: "Mazda",
    },
    {
      id: "9",
      name: "KIA",
    },
  ];
  return (
    <header className={styles.header}>
      <HeaderTop />
      <div className={styles.headerContent}>
        <Container>
          <div className={styles.headerSearch}>
            <Link href={"/"}>
              <img style={{ cursor: "pointer" }} src={logo.src} alt="" />
            </Link>
            <div className={styles.search}>
              <SearchFormName />
              <Button
                color="#EEF1F9"
                leftSection={<img src={car.src} alt="Car Icon" />}
                classNames={{ root: styles.btnAdd, inner: styles.innerAdd }}
              >
                Thêm xe
              </Button>
              <Link href={"/dat-lich"}>
                <Button
                  color="#3450E7"
                  classNames={{ root: styles.btnBook, inner: styles.innerBook }}
                >
                  Book Lịch
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.headerNav}>
            {brandData?.map((item, index) => {
              return (
                <Link href="" key={index} className={styles.itemNav}>
                  {item?.name}
                </Link>
              );
            })}
          </div>
        </Container>
      </div>
    </header>
  );
}
