"use client";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import IconMenu from "@/assets/icons/menu.svg";
import { useForm } from "@mantine/form";
import { ActionIcon, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IconCart from "@/assets/icons/cart.svg";
import dynamic from "next/dynamic";

const DynamicMenu = dynamic(() => import("./NavDrawer"), {
  ssr: false,
});
const HeaderMobile = () => {
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
          {...form.getInputProps("searchValue")}
          leftSectionPointerEvents="all"
          leftSection={
            <ActionIcon variant="transparent" type="submit">
              <IconSearch />
            </ActionIcon>
          }
          radius="lg"
          placeholder="Vui lòng nhập..."
        />
      </form>
      <div className={styles.headerNav}>
        <div className={styles.cart}>
          <img src={IconCart.src} alt="bell" />
        </div>
        <div className={styles.avatar}>
          <Link href={"/admin"}>
            <img src={logo.src} alt="avatar" />
          </Link>
        </div>
        <div className={styles.menu} onClick={() => setOpenNav(true)}>
          <img src={IconMenu.src} alt="menu" />
        </div>
      </div>
      <DynamicMenu
        open={openNav}
        onClose={() => setOpenNav(false)}
        headerTitle="Menu"
      >
        <ul className={styles.nav}>
          <li className={styles.navItem}>Hồ sơ</li>
          <li className={styles.navItem}>Giỏ hàng</li>

          <li className={styles.navLogout}>Đăng xuất</li>
        </ul>
      </DynamicMenu>
    </div>
  );
};
export default HeaderMobile;
