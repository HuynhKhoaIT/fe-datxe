import React from "react";
import { Grid, TextInput, Card, Avatar, Select } from "@mantine/core";
import { LoadingOverlay } from "@mantine/core";
export default function InfoCar({
  setCarId,
  carDefault: dataCarDefault,
  carOptions,
  session,
  visible,
  carSelect,
  selectCar,
}: any) {
  const token = session?.user?.token;

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
                label="Biển số"
                checkIconPosition="right"
                placeholder="Biển số"
                data={carOptions}
                value={carSelect?.id ?? dataCarDefault?.carId?.toString()}
                allowDeselect={false}
                onChange={(value) => {
                  selectCar(value);
                  setCarId(value);
                }}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={16}>
            <Grid.Col span={6}>
              <TextInput
                label="Hãng Xe"
                placeholder="Hãng Xe"
                readOnly
                value={
                  carSelect?.brandCarName?.name ?? dataCarDefault?.brandName
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Dòng xe"
                placeholder="Dòng xe"
                readOnly
                defaultValue={
                  carSelect?.modelCarName?.name ?? dataCarDefault?.modelName
                }
              />
            </Grid.Col>
          </Grid>
        </Card>
      </div>
    </Grid.Col>
  );
}
