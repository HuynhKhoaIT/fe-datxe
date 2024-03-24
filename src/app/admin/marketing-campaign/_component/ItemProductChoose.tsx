"use client";
import React, { useEffect, useState } from "react";
import styles from "./ItemProductChoose.module.scss";
import ImageField from "@/app/components/form/ImageField";
import ImageDefault from "@/assets/images/logo.png";
import { Checkbox, Image } from "@mantine/core";
import { modals } from "@mantine/modals";

import Typo from "@/app/components/elements/Typo";
import { useRouter } from "next/navigation";
export default function ItemProductChoose({
  data,
  removeItem,
  selectedRows,
  setSelectedRows,
}: any) {
  const [isChecked, setIschecked] = useState(true);
  console.log(selectedRows);
  const images = JSON.parse(data?.images);
  useEffect(() => {
    setIschecked(selectedRows?.some((obj: any) => obj.id === data?.id));
  }, [selectedRows]);
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
        <div className={styles.iconCheck}>
          <Checkbox
            defaultChecked={selectedRows?.some(
              (obj: any) => obj.id === data?.id
            )}
            onChange={(event) => {
              setSelectedRows(
                event.currentTarget.checked
                  ? [...selectedRows, data]
                  : selectedRows.filter(
                      (selectedItem: any) => selectedItem?.id !== data.id
                    )
              );
              console.log(data, event.currentTarget.checked);
            }}
          />
        </div>
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
          {/* 
          <div className={styles.quantity}>
            <ActionIcon variant="outline" color="gray" aria-label="Settings">
              <IconMinus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
            {data.quantity}
            <ActionIcon variant="outline" color="gray" aria-label="Settings">
              <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </div> */}
          <div className={styles.price}>
            <p style={{ color: "var(--primary-color)" }}>
              {(data?.salePrice).toLocaleString("vi", {
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
        </div>
      </div>
    </div>
  );
}
