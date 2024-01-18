"use client";
import {
  Button,
  Card,
  FileButton,
  Grid,
  Group,
  Text,
  TextInput,
  Textarea,
  Image,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan } from "@tabler/icons-react";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { statusOptions } from "@/constants/masterData";
export default function CategoryForm({ isEditing, dataDetail }: any) {
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
    getDataBrands();
    if (dataDetail?.brandId && dataDetail?.nameId) {
      getDataModels(dataDetail?.brandId);
      getDataYearCar(dataDetail?.nameId);
    }
  }, [dataDetail]);

  const [loading, handlers] = useDisclosure();
  const form = useForm({
    initialValues: {
      customerId: "",
      numberPlates: "",
      color: "",
      vinNumber: "",
      machineNumber: "",
      description: "",
      status: isEditing ? dataDetail?.status : "PUBLIC",
      garageId: "",
    },
    validate: {},
  });
  useEffect(() => {
    form.setInitialValues(dataDetail);
    form.setValues(dataDetail);
  }, [dataDetail]);
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    handlers.open();
    try {
      if (!isEditing) {
        await fetch(`/api/cars`, {
          method: "POST",
          body: JSON.stringify(values),
        });
      } else {
        await fetch(`/api/cars/${dataDetail?.id}`, {
          method: "PUT",
          body: JSON.stringify(values),
        });
      }
      handlers.close();
      router.back();
      router.refresh();
      notifications.show({
        title: "Thành công",
        message: "Thành công",
      });
    } catch (error) {
      handlers.close();
      notifications.show({
        title: "Thất bại",
        message: "Thất bại",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid gutter={12}>
        <Grid.Col span={12}>
          <Card withBorder shadow="sm">
            <Grid gutter={10}>
              <Grid.Col span={4}>
                <TextInput
                  {...form.getInputProps("numberPlates")}
                  label="Biển số xe"
                  type="text"
                  placeholder="Biển số xe"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  {...form.getInputProps("color")}
                  label="Màu xe"
                  type="text"
                  placeholder="Màu xe"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  {...form.getInputProps("status")}
                  label="Trạng thái"
                  checkIconPosition="right"
                  placeholder="Trạng thái"
                  data={statusOptions}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter={10}>
              <Grid.Col span={4}>
                <Select
                  {...form.getInputProps("carBrandId")}
                  label="Hãng xe"
                  placeholder="Hãng xe"
                  data={brandOptions}
                  onChange={(value) => {
                    getDataModels(Number(value));
                    form.setFieldValue("carBrandId", value);
                  }}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  {...form.getInputProps("carNameId")}
                  label="Dòng xe"
                  placeholder="Dòng xe"
                  data={modelOptions}
                  onChange={(value) => {
                    getDataYearCar(Number(value));
                    form.setFieldValue("carNameId", value);
                  }}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  {...form.getInputProps("carYearId")}
                  label="Năm sản xuất"
                  placeholder="Năm sản xuất"
                  data={yearCarOptions}
                  onChange={(value) => {
                    form.setFieldValue("carYearId", value);
                  }}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter={10}>
              <Grid.Col span={4}>
                <TextInput
                  {...form.getInputProps("vinNumber")}
                  label="vinNumber"
                  type="text"
                  placeholder="vinNumber"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  {...form.getInputProps("machineNumber")}
                  label="machineNumber"
                  type="text"
                  placeholder="machineNumber"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  {...form.getInputProps("carStyle")}
                  label="Năm sản xuất"
                  placeholder="Năm sản xuất"
                  data={yearCarOptions}
                  value={
                    dataDetail?.yearId ? dataDetail?.yearId.split(",") : []
                  }
                  onChange={(value) => {
                    form.setFieldValue("carYearId", value);
                  }}
                />
              </Grid.Col>
            </Grid>

            <Grid mt={24}>
              <Grid.Col span={12}>
                <Textarea
                  label="Mô tả chi tiết"
                  minRows={4}
                  autosize={true}
                  {...form.getInputProps("description")}
                  placeholder="Mô tả"
                />
              </Grid.Col>
            </Grid>
          </Card>
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
          Huỷ
        </Button>
        <Button
          loading={loading}
          style={{ marginLeft: "12px" }}
          key="submit"
          type="submit"
          variant="filled"
          leftSection={<IconPlus size={16} />}
        >
          Thêm
        </Button>
      </Group>
    </form>
  );
}
