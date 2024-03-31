"use client";
import { AppShell, Burger, Group, Skeleton, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { ReactNode } from "react";
import logo from "@/assets/images/logo.png";
import { NavbarNested } from "./NavbarNested";
import styles from "./index.module.scss";
import SigninButton from "../layout/common/desktop/login-button";
import SearchFormName from "../components/elements/search/SearchFormName";
import { useSession } from "next-auth/react";
import { useMyGarage } from "../hooks/useMyGarage";
interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  const { myGarage, isLoading } = useMyGarage();

  console.log(myGarage);
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !desktopOpened },
      }}
      padding={{ base: 10, md: 30, lg: 30 }}
    >
      <AppShell.Header>
        <Group
          style={{ flexWrap: "nowrap" }}
          h="100%"
          px="md"
          justify="space-between"
        >
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p className={styles.shortName}>{myGarage?.shortName}</p>
              {/* <p>{myGarage?.address}</p> */}
              <p className={styles.addressExpert}>230 nguyễn thị định quận 2</p>
            </div>
          </div>
          {/* {!isMobile && <SearchFormName />} */}
          <SigninButton />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar zIndex={100}>
        <Group h={60} pl={"md"}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <Text>Navbar</Text> */}

          <Link href={"/"}>
            <img style={{ height: "60px" }} src={logo.src} alt="logo" />
          </Link>
        </Group>
        <NavbarNested toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main className={styles.main}>{children}</AppShell.Main>
      {/* <AppShell.Footer h={70}>
        
      </AppShell.Footer> */}
    </AppShell>
  );
}
