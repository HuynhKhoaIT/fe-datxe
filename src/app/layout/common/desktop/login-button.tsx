"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";
import { Menu, Button, rem, Image } from "@mantine/core";
import {
  IconExternalLink,
  IconLogout,
  IconEye,
  IconCaretDownFilled,
  IconUserCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
const SigninButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleCar = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/gio-hang");
  };
  const handleDashboard = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/dashboard");
  };
  const handleAdmin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/admin");
  };
  return (
    <>
      <div className={styles.buttonLogin}>
        <IconUserCircle color="#fff" />
        <div className={styles.actionLogin}>
          {!session?.user ? (
            <div style={{ display: "flex" }}>
              <Link href="/dang-nhap" className={styles.title}>
                Đăng nhập/
              </Link>
              <Link href="/dang-ky" className={styles.title}>
                Đăng ký
              </Link>
            </div>
          ) : (
            <Menu width={200} shadow="md">
              <Menu.Target>
                <div className={styles.title} style={{ display: "flex" }}>
                  <span>{session?.user.name}</span>
                  <IconCaretDownFilled />
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  component="a"
                  onClick={handleDashboard}
                  leftSection={
                    <IconEye style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Xem hồ sơ
                </Menu.Item>
                <Menu.Item
                  component="a"
                  onClick={handleAdmin}
                  leftSection={
                    <IconEye style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Quản trị
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconExternalLink
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                  component="a"
                  onClick={handleCar}
                >
                  Đơn mua
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  component="a"
                  onClick={() => signOut()}
                  color="red"
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Đăng xuất
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </div>
    </>
  );
};

export default SigninButton;
