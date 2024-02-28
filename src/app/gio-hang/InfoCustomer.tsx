"use client";
import React, { useEffect, useState } from "react";
import { Grid, TextInput, Card } from "@mantine/core";
export default function InfoCustomer({ myAccount, dataDetail, form }: any) {
  useEffect(() => {
    const fetchData = async () => {
      form.setFieldValue("id", dataDetail?.id);
      form.setFieldValue("fullName", dataDetail?.fullName);
      form.setFieldValue("phoneNumber", dataDetail?.phoneNumber);
      form.setFieldValue("address", dataDetail?.address);
    };

    if (dataDetail) fetchData();
  }, [dataDetail]);
  return (
    <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
      <div className="checkout-widget">
        <h4 className="checkout-widget-title">Thông tin khách hàng</h4>
        <Card>
          <Grid gutter={16}>
            <Grid.Col span={6}>
              <TextInput
                {...form.getInputProps("fullName")}
                label="Họ Tên"
                placeholder="Họ Tên"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                {...form.getInputProps("phoneNumber")}
                label="Điện thoại"
                placeholder="Điện thoại"
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={16}>
            <Grid.Col span={12}>
              <TextInput
                {...form.getInputProps("address")}
                label="Địa chỉ"
                type="text"
                placeholder="Địa chỉ"
              />
            </Grid.Col>
          </Grid>
        </Card>
      </div>
    </Grid.Col>
  );
}
