"use client";
import { Fragment } from "react";
import styles from "./index.module.scss";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconBan, IconPlus } from "@tabler/icons-react";
export default function FooterSavePage({
  saveLoading,
  okText = "Thêm",
  cancelText = "Huỷ",
}: any) {
  const router = useRouter();
  return (
    <div className={styles.footerSavePage}>
      <Button
        size="lg"
        radius={0}
        h={{ base: 42, md: 50, lg: 50 }}
        variant="outline"
        key="cancel"
        color="red"
        leftSection={<IconBan size={16} />}
        onClick={() => router.back()}
      >
        {cancelText}
      </Button>
      <Button
        size="lg"
        radius={0}
        h={{ base: 42, md: 50, lg: 50 }}
        loading={saveLoading}
        style={{ marginLeft: "12px" }}
        key="submit"
        type="submit"
        variant="filled"
        leftSection={<IconPlus size={16} />}
      >
        {okText}
      </Button>
    </div>
  );
}
