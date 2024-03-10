"use client";
import React from "react";
import { Grid, Modal, Textarea, TextInput, Box } from "@mantine/core";
import dayjs from "dayjs";
import BasicModal from "@/app/components/common/BasicModal";

const PreviewModal = ({ data, onOk, opened, onCancel, ...props }: any) => {
  return (
    <BasicModal
      size={800}
      title="Thông tin chi tiết"
      isOpen={opened}
      closeButtonProps
      onCloseModal={onCancel}
      lockScroll={false}
      {...props}
    >
      <Box maw={800}>
        <Grid gutter={10}>
          <Grid.Col span={6}>
            <TextInput
              size="md"
              label="Biển số xe"
              readOnly
              type="text"
              name="licensePlates"
              value={data.licensePlates}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size="md"
              readOnly
              type="text"
              name="brandCar"
              label="Hãng xe"
              value={data?.brandCarName?.name}
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={10}>
          <Grid.Col span={6}>
            <TextInput
              size="md"
              readOnly
              type="text"
              name="modelCar"
              label="Dòng xe"
              value={data?.modelCarName?.name}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size="md"
              readOnly
              type="text"
              name="color"
              label="Màu xe"
              value={data.color}
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={10}>
          <Grid.Col span={6}>
            <TextInput
              size="md"
              readOnly
              type="number"
              name="vin_number"
              label="Vin Number"
              value={Number(data.vinNumber)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size="md"
              readOnly
              type="text"
              name="date_repair"
              label="Date Repairt"
              value={
                data?.maintenanceDate &&
                dayjs(data?.maintenanceDate).add(1, "day").format("DD/MM/YYYY")
              }
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={10}>
          <Grid.Col span={6}>
            <TextInput
              size="md"
              readOnly
              type="text"
              name="registration_deadline"
              label="Registration Deadline"
              value={
                data?.registrationDate &&
                dayjs(data?.registrationDate).add(1, "day").format("DD/MM/YYYY")
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size="md"
              readOnly
              type="text"
              name="civil_insurance_deadline"
              label="Civil deadline"
              value={
                data?.civilInsuranceDate &&
                dayjs(data.civilInsuranceDate)
                  .add(1, "day")
                  .format("DD/MM/YYYY")
              }
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={10}>
          <Grid.Col span={6}>
            <TextInput
              size="md"
              readOnly
              type="text"
              name="material_insurance_deadline"
              label="Material deadline"
              value={
                data?.materialInsuranceDate &&
                dayjs(data.materialInsuranceDate)
                  .add(1, "day")
                  .format("DD/MM/YYYY")
              }
            />
          </Grid.Col>
        </Grid>
        {/* Uncomment below to include the description TextArea */}
        {/* <Grid>
          <Grid.Col span={24}>
            <TextArea
              readOnly
              showCount
              name="description"
              maxLength={100}
              label="Mô tả chi tiết"
              placeholder="Mô tả chi tiết"
              value={data.description}
              style={{ height: 60, resize: 'none' }}
            />
          </Grid.Col>
        </Grid> */}
      </Box>
    </BasicModal>
  );
};

export default PreviewModal;
