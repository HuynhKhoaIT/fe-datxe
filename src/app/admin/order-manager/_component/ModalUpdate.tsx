"use client";
import React from "react";
import styles from "./index.module.scss";
import { Button, Grid, Group, Modal, NumberInput } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import { IconChevronRight } from "@tabler/icons-react";
export default function ModalUpdate({
  data,
  openModal,
  close,
  form,
  index,
}: any) {
  return (
    <div className={styles.modalWrapper}>
      <Modal
        title="Cập nhật"
        opened={openModal}
        onClose={close}
        lockScroll
        centered
        radius={0}
        size={"100%"}
      >
        <Typo size="sub" type="bold" style={{ padding: "10px 0" }}>
          Tên: {data?.name}
        </Typo>
        <Grid>
          <Grid.Col span={8}>
            <NumberInput
              label="Giá bán"
              radius={0}
              {...form.getInputProps(`detail.${index}.priceSale`)}
              min={0}
              placeholder="Giá sale"
              suffix="đ"
              thousandSeparator=","
              onChange={(value: any) => {
                console.log("value", value);
                form.setFieldValue(
                  `detail.${index}.subTotal`,
                  form.values.detail[index].quantity * Number(value)
                );
                form.setFieldValue(`detail.${index}.priceSale`, value);
              }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              label="Số lượng"
              radius={0}
              {...form.getInputProps(`detail.${index}.quantity`)}
              min={0}
              placeholder="Số lượng"
              thousandSeparator=","
              onChange={(value: any) => {
                console.log(
                  form.values.detail[index].priceSale * Number(value)
                );
                form.setFieldValue(`detail.${index}.quantity`, value);
                form.setFieldValue(
                  `detail.${index}.subTotal`,
                  form.values.detail[index].priceSale * Number(value)
                );
              }}
            />
          </Grid.Col>
        </Grid>
        <Group justify="end" style={{ marginTop: 30 }}>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            onClick={() => {
              close();
            }}
            variant="filled"
          >
            Ok
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
