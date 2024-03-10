"use client";
import React, { useEffect, useState } from "react";
import { Grid, TextInput, Card, Avatar, Select } from "@mantine/core";
import { LoadingOverlay } from "@mantine/core";
export default function InfoCar({
  myAccount,
  visible,
  form,
  carOptions,
  carDetail,
  setCarDetail,
}: any) {
  useEffect(() => {
    const fetchData = async () => {
      form.setFieldValue("carId", carDetail?.id);
      form.setFieldValue("carBrandId", carDetail?.carBrandId);
      form.setFieldValue("carNameId", carDetail?.carNameId);
      form.setFieldValue("carYearId", carDetail?.carYearId);
      form.setFieldValue("numberPlates", carDetail?.id.toString());
    };

    if (carDetail) fetchData();
  }, [carDetail]);

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
        <h4 className="checkout-widget-title">Thông tin Xe</h4>
        <Card pos="relative">
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />

          <Grid gutter={16}>
            <Grid.Col span={12}>
              <Select
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
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="lg"
                radius={0}
                label="Hãng Xe"
                placeholder="Hãng Xe"
                readOnly
                {...form.getInputProps("carBrandId")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("carNameId")}
                label="Dòng xe"
                placeholder="Dòng xe"
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("carYearId")}
                label="Năm sản xuất"
                placeholder="Năm sản xuất"
                readOnly
              />
            </Grid.Col>
          </Grid>
        </Card>
      </div>
    </Grid.Col>
  );
}
