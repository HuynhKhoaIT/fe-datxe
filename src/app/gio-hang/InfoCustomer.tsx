import React from "react";
import { Grid, TextInput, Card } from "@mantine/core";
export default function InfoCustomer({ dataDetail }: any) {
  return (
    <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
      <div className="checkout-widget">
        <h4 className="checkout-widget-title">Thông tin khách hàng</h4>
        <Card>
          <Grid gutter={16}>
            <Grid.Col span={12}>
              <TextInput
                label="Họ Tên"
                placeholder="Họ Tên"
                defaultValue={dataDetail?.name || ""}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={16}>
            <Grid.Col span={6}>
              <TextInput
                label="Email"
                placeholder="Email"
                defaultValue={dataDetail?.email ?? ""}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Điện thoại"
                placeholder="Điện thoại"
                defaultValue={dataDetail?.phone ?? ""}
              />
            </Grid.Col>
          </Grid>
        </Card>
      </div>
    </Grid.Col>
  );
}
