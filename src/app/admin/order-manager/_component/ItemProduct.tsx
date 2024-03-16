import React from "react";
import styles from "./ItemProduct.module.scss";
import ImageField from "@/app/components/form/ImageField";
import ImageDefault from "@/assets/images/logo.png";
import { ActionIcon, Box, Button, Flex, Group, Image } from "@mantine/core";
import { modals } from "@mantine/modals";

import Typo from "@/app/components/elements/Typo";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
export default function ItemProduct({ data, removeItem }: any) {
  const routes = useRouter();
  const DeleteItemConfirm = (data: any) => {
    modals.openConfirmModal({
      title: (
        <Typo
          size="small"
          type="semi-bold"
          style={{ color: "var(--primary-color)" }}
        >
          Xác nhận
        </Typo>
      ),
      children: (
        <Typo size="sub">Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?</Typo>
      ),
      size: "350px",
      centered: true,
      zIndex: 999,
      withCloseButton: false,
      labels: { confirm: "Xóa", cancel: "Hủy" },
      onConfirm: () => removeItem(data),
    });
  };
  return (
    <div className={styles.item}>
      <div className={styles.itemLeft}>
        <div className={styles.imgItem}>
          <Image
            src={ImageDefault.src}
            alt="Relevant Image"
            width="80px"
            height={"80px"}
            radius="md"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{data?.name}</div>

          <div className={styles.quantity}>
            <ActionIcon variant="outline" color="gray" aria-label="Settings">
              <IconMinus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
            {data.quantity}
            <ActionIcon variant="outline" color="gray" aria-label="Settings">
              <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </div>
        </div>
      </div>

      <div className={styles.price}>
        {(data?.price).toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}
      </div>
      <IconTrash
        color="red"
        className={styles.trash}
        onClick={() => DeleteItemConfirm(data)}
      />
    </div>
  );
}
