"use client";
import { AppShell, Burger, Group, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { ReactNode } from "react";
import logo from "@/assets/images/logo.png";
import { NavbarNested } from "./NavbarNested";
import FooterAdmin from "../components/page/footer/footer-admin";
import styles from "./index.module.scss";
interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Link href={"/"}>
            <img style={{ height: "60px" }} src={logo.src} alt="logo" />
          </Link>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Group h={60} pl={"md"}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>Navbar</Text>
        </Group>
        <NavbarNested />
      </AppShell.Navbar>
      <AppShell.Main className={styles.main}>{children}</AppShell.Main>
      <AppShell.Footer h={70}>
        <FooterAdmin />
      </AppShell.Footer>
    </AppShell>
  );
}
