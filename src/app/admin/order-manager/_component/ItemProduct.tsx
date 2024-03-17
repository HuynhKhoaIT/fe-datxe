import React from "react";
import styles from "./index.module.scss";
import ImageField from "@/app/components/form/ImageField";
import ImageDefault from "@/assets/images/logo.png";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Menu,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import Typo from "@/app/components/elements/Typo";
import { IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";

const DynamicModalUpdate = dynamic(() => import("./ModalUpdate"), {
  ssr: false,
});

export default function ItemProduct({
  data,
  removeItem,
  form,
  index,
  setSelectedProducts,
  selectedProducts,
}: any) {
  console.log(data);
  const [
    openModalChoose,
    { open: openModal, close: closeModal },
  ] = useDisclosure(false);
  const images = JSON.parse(data?.images);
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
            src={images[0]}
            alt="Relevant Image"
            width="80px"
            height={"80px"}
            radius="md"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.title}>{data?.name}</div>
          <div className={styles.price}>
            <p style={{ color: "var(--primary-color)" }}>
              {(data?.priceSale).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <del style={{ color: "var(--title-color-2)" }}>
              {(data?.price).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </del>
          </div>
          <div className={styles.quantity}>
            Số lượng:
            <span>{data.quantity}</span>
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <Menu>
          <Menu.Target>
            <IconDotsVertical />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={openModal}>Chỉnh sửa</Menu.Item>
            <Menu.Item
              onClick={(e) => {
                setSelectedProducts(
                  selectedProducts.filter(
                    (selectedItem: any) =>
                      selectedItem.id !== data.id &&
                      selectedItem.id !== data.productId
                  )
                );
              }}
            >
              Xoá
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <DynamicModalUpdate
        openModal={openModalChoose}
        close={closeModal}
        data={data}
        form={form}
        index={index}
      />
    </div>
  );
}
