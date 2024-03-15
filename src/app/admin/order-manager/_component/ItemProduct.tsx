import React from "react";
import styles from "./ItemProduct.module.scss";
import ImageField from "@/app/components/form/ImageField";
import ImageDefault from "@/assets/images/logo.png";
import { Box, Flex, Group, Image } from "@mantine/core";
import { modals } from "@mantine/modals";

import Typo from "@/app/components/elements/Typo";
import { IconTrash } from "@tabler/icons-react";
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
      <Flex className={styles.itemcart} gap="xs" pl={5}>
        <Box onClick={() => routes.push(`/product/${data.id}`)}>
          <Image
            src={ImageDefault.src}
            alt="Relevant Image"
            w="114"
            height={"80px"}
            radius="md"
          />
        </Box>
        <Box pr={44}>
          <Typo size="primary" className={styles.titleItem}>
            {data?.name}
          </Typo>
          <Group>
            <Typo size="primary" style={{ color: "var(--primary-color)" }}>
              154,155 đ
            </Typo>
          </Group>
        </Box>
        <IconTrash
          color="red"
          className={styles.trash}
          onClick={() => DeleteItemConfirm(data)}
        />
      </Flex>
    </div>
  );
}
