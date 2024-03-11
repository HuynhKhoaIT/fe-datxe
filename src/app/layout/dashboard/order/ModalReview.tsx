"use client";
import React from "react";
import BasicModal from "@/app/components/common/BasicModal";
import { Image, Rating, Textarea } from "@mantine/core";
import styles from "./ModalReview.module.scss";
import Typo from "@/app/components/elements/Typo";
export default function ModalReview({
  openedModal,
  onCloseModal,
  title,
  onOkModal,
  onCancelModal,
  dataDetail,
}: any) {
  console.log(dataDetail);
  return (
    <BasicModal
      isOpen={openedModal}
      onCloseModal={onCloseModal}
      title={title}
      onOkModal={onOkModal}
      footer={true}
      size={800}
      centered={true}
      onCancelModal={onCancelModal}
      okText="Hoàn thành"
      cancelText="Trở lại"
      withCloseButton={false}
      classNames={{
        root: styles.root,
        title: styles.title,
      }}
    >
      <div className={styles.listProduct}>
        {dataDetail?.orderDetails?.map((item: any, index: number) => {
          const images = JSON.parse(item?.product?.images);
          return (
            <div className={styles.itemProduct}>
              <Image radius="md " h={60} w={80} fit="contain" src={images[0]} />
              <Typo size="sub" type="semi-bold">
                {item?.product?.name}
              </Typo>
            </div>
          );
        })}
        <div>
          <div className={styles.rating}>
            <Typo size="sub">Chất lượng sản phẩm</Typo>
            <Rating defaultValue={5} size="lg" />
          </div>
          <div className={styles.review}>
            <Textarea
              size="lg"
              radius={0}
              label="Chất lượng sản phẩm:"
              placeholder="Để lại đánh giá"
              variant="unstyled"
              bg={"#ffffff"}
              p={20}
              classNames={{
                root: styles.rootTextArea,
                label: styles.labelTextArea,
                input: styles.iputTextArea,
              }}
              style={{ border: "1px solid #000" }}
            />
          </div>
        </div>
      </div>
    </BasicModal>
  );
}
