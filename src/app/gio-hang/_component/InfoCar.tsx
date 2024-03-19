"use client";
import React, { useEffect, useState } from "react";
import { Grid, TextInput, Card, Avatar, Select } from "@mantine/core";
import { LoadingOverlay } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import styles from "../index.module.scss";
import dynamic from "next/dynamic";

import { IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ComboboxField from "./ComboboxField";
const DynamicModalAddCar = dynamic(() => import("../_component/ModalAddCar"), {
  ssr: false,
});

export default function InfoCar({
  myAccount,
  visible,
  form,
  carOptions,
  carsData,
  setCarDetail,
}: any) {
  console.log(myAccount);
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );

  async function getCarDetail(carId: number) {
    if (carId) {
      const res = await fetch(`/api/car/${carId}`, { method: "GET" });
      const data = await res.json();
      if (!data) {
        throw new Error("Failed to fetch data");
      }
      setCarDetail(data);
    }
  }
  return (
    <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
      <div className="checkout-widget">
        <div className={styles.titleCard}>
          <h4 className={styles.title}>Thông tin Xe</h4>
        </div>
        <Card pos="relative">
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />

          <Grid gutter={16}>
            <Grid.Col span={12}>
              {/* <Select
                size="lg"
                radius={0}
                {...form.getInputProps("numberPlates")}
                label="Biển số"
                checkIconPosition="right"
                placeholder="Biển số"
                data={carOptions}
                allowDeselect={false}
                onChange={(value) => {
                  getCarDetail(Number(value));
                  form.setFieldValue("numberPlates", value);
                }}
                nothingFoundMessage="Nothing found..."
              /> */}
              <ComboboxField
                form={form}
                label="Biển số"
                carsData={carsData}
                openModal={openModal}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="lg"
                radius={0}
                label="Hãng Xe"
                placeholder="Hãng Xe"
                readOnly
                {...form.getInputProps("carBrandName")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("carModelName")}
                label="Dòng xe"
                placeholder="Dòng xe"
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("carYear")}
                label="Năm sản xuất"
                placeholder="Năm sản xuất"
                readOnly
              />
            </Grid.Col>
          </Grid>
        </Card>
      </div>
      <DynamicModalAddCar
        openModal={openedModal}
        close={closeModal}
        myAccount={myAccount}
      />
    </Grid.Col>
  );
}
