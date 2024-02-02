"use client";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import IconBell from "@/assets/icons/bell.svg";
import IconMenu from "@/assets/icons/menu.svg";
import { useForm } from "@mantine/form";
import { ActionIcon, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
const HeaderMobile = () => {
  const form = useForm({
    initialValues: {
      searchValue: "",
    },
    validate: {},
  });
  const handleSubmit = (values: any) => {
    try {
      //   navigate(`/search?query=${values?.searchValue}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo.src} alt="logo" />
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
        <div className={styles.noti}>
          <img src={IconBell.src} alt="bell" />
        </div>
        <div className={styles.avatar}>
          <img src={logo.src} alt="avatar" />
        </div>
        <div className={styles.menu}>
          <img src={IconMenu.src} alt="menu" />
        </div>
      </div>
    </div>
  );
};
export default HeaderMobile;
