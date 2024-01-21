"use client";
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Select,
  Switch,
  Table,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan } from "@tabler/icons-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { BasicDropzone } from "@/app/components/form/DropZone";
import InfoCar from "../[orderId]/InfoCar";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import DateTimeField from "@/app/components/form/DateTimeField";
import axios, { AxiosRequestConfig } from "axios";
import { stepOrderOptions } from "@/constants/masterData";

export default function OrderForm({
  isEditing = false,
  dataDetail,
  isDirection = false,
}: any) {
  console.log(dataDetail);
  const [loading, handlers] = useDisclosure();
  const router = useRouter();

  const form = useForm({
    initialValues: {},
    validate: {},
  });

  const [brandOptions, setBrandOptions] = useState<any>([]);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  async function getDataBrands() {
    const res = await fetch(`/api/car-model`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setBrandOptions(dataOption);
  }
  async function getDataModels(brandId: number) {
    if (brandId) {
      const res = await fetch(`/api/car-model/${brandId}`, { method: "GET" });
      const data = await res.json();
      if (!data) {
        throw new Error("Failed to fetch data");
      }
      const dataOption = data?.map((item: any) => ({
        value: item.id.toString(),
        label: item.title,
      }));
      setModelOptions(dataOption);
    }
  }
  async function getDataYearCar(modelId: number) {
    if (modelId) {
      const res = await fetch(`/api/car-model/${modelId}`, {
        method: "GET",
      });
      const data = await res.json();
      if (!data) {
        throw new Error("Failed to fetch data");
      }
      const dataOption = data?.map((item: any) => ({
        value: item.id.toString(),
        label: item.title,
      }));
      setYearCarOptions(dataOption);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      handlers.open();

      if (isEditing && dataDetail) {
        try {
          await Promise.all([
            getDataBrands(),
            getDataModels(dataDetail?.car?.carBrandId),
            getDataYearCar(dataDetail?.car?.carNameId),
          ]);

          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);
          form.setFieldValue("customerId", dataDetail?.customerId.toString());
          form.setFieldValue(
            "car.carBrandId",
            dataDetail?.car?.carBrandId.toString()
          );
          form.setFieldValue(
            "car.carNameId",
            dataDetail?.car?.carNameId.toString()
          );
          form.setFieldValue(
            "car.carYearId",
            dataDetail?.car?.carYearId.toString()
          );
          form.setFieldValue("step", dataDetail?.step.toString());
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          handlers.close();
        }
      }
    };

    if (isEditing) fetchData();
  }, [dataDetail]);

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  const rows = dataDetail.orderDetails.map(
    (selectedRow: any, index: number) => {
      // const images = JSON.parse(selectedRow.images);
      return (
        <Table.Tr key={selectedRow.id}>
          <Table.Td>{selectedRow.product.name}</Table.Td>
          <Table.Td>{selectedRow.priceSale}</Table.Td>
          <Table.Td>{selectedRow.quantity}</Table.Td>
        </Table.Tr>
      );
    }
  );
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)} style={{ padding: "20px" }}>
        <Grid gutter={12}>
          <Grid.Col span={6}>
            Thông tin khách hàng
            <Grid gutter={12}>
              <Grid.Col span={6}>
                <TextInput
                  {...form.getInputProps("customer.fullName")}
                  label="Tên khách hàng"
                  type="text"
                  placeholder="Tên khách hàng"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  {...form.getInputProps("customer.phoneNumber")}
                  label="Số điện thoại"
                  type="text"
                  placeholder="Số điện thoại"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  {...form.getInputProps("customer.address")}
                  label="Địa chỉ"
                  type="text"
                  placeholder="Địa chỉ"
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={6}>
            Thông tin xe
            <Grid gutter={12}>
              <Grid.Col span={6}>
                <TextInput
                  {...form.getInputProps("car.numberPlates")}
                  label="Biển số xe"
                  type="text"
                  placeholder="Biển số xe"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  {...form.getInputProps("car.carBrandId")}
                  label="Hãng xe"
                  type="text"
                  data={brandOptions}
                  placeholder="Hãng xe"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  {...form.getInputProps("car.carNameId")}
                  label="Dòng xe"
                  type="text"
                  data={modelOptions}
                  placeholder="Dòng xe"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  {...form.getInputProps("car.carYearId")}
                  label="Năm sản xuất"
                  data={yearCarOptions}
                  type="text"
                  placeholder="Năm sản xuất"
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <Grid mt={24}>
          <Grid.Col span={12}>
            Chi tiết đơn hàng
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Tên sản phẩm</Table.Th>
                  <Table.Th>Giá</Table.Th>
                  <Table.Th>Số lượng</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Grid.Col>
        </Grid>
        <Grid gutter={12} mt={24}>
          <Grid.Col span={6}>
            <NumberInput
              label="Tổng đơn hàng"
              placeholder="Tổng đơn hàng"
              {...form.getInputProps("total")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Tình trạng đơn hàng"
              placeholder="Tình trạng đơn hàng"
              {...form.getInputProps("step")}
              data={stepOrderOptions}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Textarea
              {...form.getInputProps("note")}
              label="Ghi chú của khách hàng"
              minRows={3}
              autosize={true}
              placeholder="Ghi chú của khách hàng"
            />
          </Grid.Col>
        </Grid>
        <Group justify="end" style={{ marginTop: 60 }}>
          <Button
            variant="outline"
            key="cancel"
            color="red"
            leftSection={<IconBan size={16} />}
            onClick={() => router.back()}
          >
            Huỷ bỏ
          </Button>
          <Button
            loading={loading}
            style={{ marginLeft: "12px" }}
            key="submit"
            type="submit"
            variant="filled"
            leftSection={<IconPlus size={16} />}
          >
            {isEditing ? "Cập nhật" : isDirection ? "Điều hướng" : "Thêm"}
          </Button>
        </Group>
      </form>
    </Box>
  );
}
