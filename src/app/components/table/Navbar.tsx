"use client";
import { useState } from "react";
import { Group, Code, Image } from "@mantine/core";
import { IconSwitchHorizontal, IconLogout } from "@tabler/icons-react";
import styles from "./index.module.scss";
import Logo from "../../assets/images/logoDatxe.png";
import Link from "next/link";
import { signOut } from "next-auth/react";
export function Navbar({ data }: any) {
  const [active, setActive] = useState(data[0].label);
  const links = data?.map((item: any) => (
    <Link
      className={styles.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={styles.linkIcon} stroke={1.5} color="#000" />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarMain}>
        <Group className={styles.header} justify="center" align="center" w={70}>
          <Image radius="md" src={Logo.src} />
        </Group>
        {links}
      </div>

      <div className={styles.footer}>
        <Link href={"/"} className={styles.link} onClick={() => signOut()}>
          <IconLogout className={styles.linkIcon} stroke={1.5} />
          <span>Đăng xuất</span>
        </Link>
      </div>
    </nav>
  );
}
