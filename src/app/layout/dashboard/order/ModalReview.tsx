"use client";
import React from "react";
import BasicModal from "@/app/components/common/BasicModal";
import { Button, Image, Modal, Rating, Textarea } from "@mantine/core";
import styles from "./ModalReview.module.scss";
import Typo from "@/app/components/elements/Typo";
import { useForm } from "@mantine/form";
import axios from "axios";
import { notifications } from "@mantine/notifications";
export default function ModalReview({
  openedModal,
  onCloseModal,
  title,
  dataDetail,
  orderId,
}: any) {
  const images = JSON.parse(dataDetail?.product?.images);
  const form = useForm({
    initialValues: {
      productId: dataDetail?.productId,
      orderId: orderId,
      star: 5,
      message: "",
    },
    validate: {},
  });
  const handleSubmit = async (values: any) => {
    try {
      await axios.post("/api/reviews", values);
      notifications.show({
        title: "Thành công",
        message: "Gửi đánh giá thành công.",
      });
      onCloseModal();
    } catch (error) {
      notifications.show({
        title: "Thất bại",
        message: "Gửi đánh giá thất bại.",
      });
      onCloseModal();
    }
  };
  return (
    <Modal
      opened={openedModal}
      onClose={onCloseModal}
      title={title}
      size={800}
      centered={true}
      withCloseButton={true}
      lockScroll
      classNames={{
        root: styles.root,
        title: styles.title,
      }}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <div className={styles.listProduct}>
          <div className={styles.itemProduct}>
            <Image radius="md " h={60} w={80} fit="contain" src={images[0]} />
            <Typo size="sub" type="semi-bold">
              {dataDetail?.product?.name}
            </Typo>
          </div>
          <div>
            <div className={styles.rating}>
              <Typo size="sub">Chất lượng sản phẩm</Typo>
              <Rating
                defaultValue={5}
                size="lg"
                onChange={(value) => {
                  form.setFieldValue("start", value);
                }}
              />
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
                {...form.getInputProps("message")}
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
        <div
          style={{
            width: "100%",
            position: "fixed",
            gap: "20px",
            bottom: 0,
            left: 0,
            display: "flex",
            justifyContent: "end",
            padding: 10,
            borderTop: "1px solid #ddd",
          }}
        >
          <Button type="submit" key="submit">
            Gửi đánh giá
          </Button>
        </div>
      </form>
    </Modal>
  );
}
