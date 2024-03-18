"use client";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import IconMenu from "@/assets/icons/menu.svg";
import { useForm } from "@mantine/form";
import { ActionIcon, Input } from "@mantine/core";
import {
  IconLogin,
  IconLogout,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IconCart from "@/assets/icons/cart.svg";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";

const DynamicMenu = dynamic(() => import("./NavDrawer"), {
  ssr: false,
});
const HeaderMobile = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [openNav, setOpenNav] = useState(false);
  const form = useForm({
    initialValues: {
      searchValue: "",
    },
    validate: {},
  });
  const handleSubmit = (values: any) => {
    try {
      router.push(`/tim-kiem?q=${values?.searchValue}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href={"/"}>
            <img src={logo.src} alt="logo" />
          </Link>
        </div>
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className={styles.searchForm}
        >
          <Input
            size="lg"
            radius={0}
            {...form.getInputProps("searchValue")}
            leftSectionPointerEvents="all"
            leftSection={
              <ActionIcon variant="transparent" type="submit">
                <IconSearch />
              </ActionIcon>
            }
            placeholder="Vui lòng nhập..."
          />
        </form>
        <div className={styles.headerNav}>
          <Link href={"/gio-hang"} className={styles.cart}>
            <img src={IconCart.src} alt="bell" />
          </Link>
          <div className={styles.avatar}>
            <Link href={"/admin"}>
              <img src={logo.src} alt="avatar" />
            </Link>
          </div>
          <div className={styles.menu} onClick={() => setOpenNav(true)}>
            <img src={IconMenu.src} alt="menu" />
          </div>
        </div>
      </div>
      <DynamicMenu
        open={openNav}
        onClose={() => setOpenNav(false)}
        headerTitle="Menu"
      >
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Link href="/admin/profile">
              <IconUser size={18} />
              Hồ sơ
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin/cart">
              <img src={IconCart.src} alt="bell" />
              Giỏ hàng
            </Link>
          </li>
          {!session?.user ? (
            <Link href="/dang-nhap" className={styles.title}>
              <li className={styles.navLogout}>
                <IconLogin size={18} />
                Đăng nhập
              </li>
            </Link>
          ) : (
            <Link
              href={"/"}
              onClick={() => signOut()}
              className={styles.navLogout}
            >
              <IconLogout size={18} />
              Đăng xuất
            </Link>
          )}
        </ul>
      </DynamicMenu>
    </>
  );
};
export default HeaderMobile;
