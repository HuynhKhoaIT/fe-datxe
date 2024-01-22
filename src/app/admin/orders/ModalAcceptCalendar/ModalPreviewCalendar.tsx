import React, { useEffect, useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  Grid,
  Textarea,
  Select,
  Radio,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import styles from "./index.module.scss";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { stepOrderOptions } from "@/constants/masterData";
require("dayjs/locale/vi");

export const ModalPreviewCalendar = ({ detail, onClose }: any) => {
  const [loading, handlers] = useDisclosure();
  const form = useForm({
    initialValues: {},
    validate: {},
  });
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

  async function getDataInfoOrder() {
    const res = await fetch(`/api/orders/create`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const orderInfo = await res.json();
    const categoryOptions = orderInfo?.categories?.map((category: any) => ({
      value: category.id?.toString() || "",
      label: category.title || "",
    }));
    setCategoryOptions(categoryOptions);
    const carOptions = orderInfo?.cars?.map((car: any) => ({
      value: car.id?.toString() || "",
      label: car.numberPlates || "",
      otherData: {
        carId: car.id?.toString() || "",
        brandId: car.carBrandId,
        modelId: car.carNameId,
        carYearId: car.carYearId,
      },
    }));
    const newBrands = orderInfo?.carBrands?.map((brand: any) => ({
      value: brand.id?.toString() || "",
      label: brand.title || "",
    }));
    const advisorOptions = orderInfo?.serviceadvisors?.map((advisor: any) => ({
      value: advisor.id?.toString(),
      label: advisor.fullName,
    }));
    setAdvisorOptions(advisorOptions);
  }
  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      await Promise.all([
        getDataInfoOrder(),
        getDataBrands(),
        getDataModels(detail?.car?.carBrandId),
        getDataYearCar(detail?.car?.carNameId),
      ]);
      form.setInitialValues(detail);
      form.setValues(detail);
      form.setFieldValue("dateTime", dayjs(detail?.dateTime).toDate());
      form.setFieldValue("fullName", detail?.customer?.fullName);
      form.setFieldValue("phoneNumber", detail?.customer?.phoneNumber);
      form.setFieldValue("numberPlates", detail?.car?.numberPlates);
      form.setFieldValue("carBrandId", detail?.car?.carBrandId.toString());
      form.setFieldValue("carNameId", detail?.car?.carNameId.toString());
      form.setFieldValue("carYearId", detail?.car?.carYearId.toString());
      form.setFieldValue("orderCategoryId", detail?.orderCategoryId.toString());
      form.setFieldValue("step", detail?.step.toString());
      form.setFieldValue("priorityLevel", detail?.priorityLevel.toString());

      form.setFieldValue(
        "serviceAdvisorId",
        detail?.serviceAdvisor?.id?.toString()
      );

      handlers.close();
    };
    if (detail) fetchData();
  }, [detail]);
  const handleSubmit = async (values: any) => {
    try {
      await fetch(`/api/orders/${detail.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
      });
      notifications.show({
        title: "Thành công",
        message: "Thành công",
      });
    } catch (error) {
      notifications.show({
        title: "Thất bại",
        message: "Thất bại",
      });
    } finally {
      onClose();
    }
  };

  const [brandOptions, setBrandOptions] = useState<any>([]);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [advisorOptions, setAdvisorOptions] = useState<any>([]);
  const [garageOptions, setGarageOptions] = useState<any>([]);
  return (
    <Box w={"100%"}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          label="Yêu cầu khách hàng"
          placeholder="Yêu cầu khách hàng"
          withAsterisk={true}
          {...form.getInputProps("customerRequest")}
        />
        <Radio.Group
          label="Mức độ yêu cầu"
          withAsterisk
          {...form.getInputProps("priorityLevel")}
        >
          <Group mt="xs">
            <Radio value={"1"} label="Thấp" />
            <Radio value={"2"} label="Trung bình" />
            <Radio value={"3"} label="Cao" />
          </Group>
        </Radio.Group>

        <Grid gutter={10} mt="md">
          <Grid.Col span={6}>
            <TextInput
              label="Họ và tên"
              placeholder="Họ và tên"
              withAsterisk
              {...form.getInputProps("fullName")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Số điện thoại"
              placeholder="Số điện thoại"
              withAsterisk
              {...form.getInputProps("phoneNumber")}
            />
          </Grid.Col>
        </Grid>
        <Grid mt="md" justify="center">
          <Grid.Col span={6} className="input-plate">
            <TextInput
              label="Biển số xe"
              withAsterisk
              classNames={{
                root: styles.rootPlates,
                input: styles.inputPlates,
              }}
              placeholder="Nhập biển số xe"
              size="lg"
              {...form.getInputProps("numberPlates")}
            ></TextInput>
          </Grid.Col>
        </Grid>

        <Grid gutter={10} mt="md">
          <Grid.Col span={4}>
            <Select
              label="Hãng xe"
              {...form.getInputProps("carBrandId")}
              name="carBrandId"
              data={brandOptions}
              placeholder="Hãng xe"
              allowDeselect={false}
              leftSection={<IconPlus size={22} color="blue" />}
              onChange={(value) => {
                form.setFieldValue("carBrandId", value);
                form.setFieldValue("carNameId", null);
              }}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="Dòng xe"
              data={modelOptions}
              placeholder="Dòng xe"
              leftSection={<IconPlus size={22} color="blue" />}
              withAsterisk
              allowDeselect={false}
              {...form.getInputProps("carNameId")}
              onChange={(value: any) => {
                form.setFieldValue("carNameId", value);
                form.setFieldValue("carYearId", null);
              }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="Năm sản xuất"
              data={yearCarOptions}
              placeholder="Năm sản xuất"
              leftSection={<IconPlus size={22} color="blue" />}
              withAsterisk
              allowDeselect={false}
              {...form.getInputProps("carYearId")}
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={10} mt="md">
          <Grid.Col span={6}>
            <Select
              label="Danh mục đặt lịch"
              data={categoryOptions}
              placeholder="Danh mục đặt lịch"
              withAsterisk
              allowDeselect={false}
              leftSection={<IconPlus size={22} color="blue" />}
              {...form.getInputProps("orderCategoryId")}
            />
          </Grid.Col>
          <Grid.Col span={6} className="input-date">
            <DateTimePicker
              label="Thời gian đặt lịch"
              valueFormat="DD/MM/YYYY hh:mm A"
              placeholder="Thời gian đặt lịch"
              leftSection={<IconPlus size={22} color="blue" />}
              {...form.getInputProps("dateTime")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Cố vận dịch vụ"
              allowDeselect={false}
              data={advisorOptions}
              placeholder="Chọn CVDV"
              leftSection={<IconPlus size={22} color="blue" />}
              withAsterisk
              {...form.getInputProps("serviceAdvisorId")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Chuyên gia"
              allowDeselect={false}
              data={garageOptions}
              placeholder="Chọn chuyên gia"
              withAsterisk
              {...form.getInputProps("garageId")}
            />
          </Grid.Col>
        </Grid>

        <Grid mt="md">
          <Grid.Col span={12}>
            <Textarea
              label="Ghi chú cho CVDV"
              placeholder="Ghi chú cho CVDV"
              withAsterisk
              {...form.getInputProps("customerNote")}
            />
          </Grid.Col>
        </Grid>
        <Grid mt="md">
          <Grid.Col span={12}>
            <Select
              label="Tình trạng"
              {...form.getInputProps("step")}
              placeholder="Tình trạng"
              data={stepOrderOptions}
            />
          </Grid.Col>
        </Grid>
        <Group
          grow
          preventGrowOverflow={false}
          wrap="nowrap"
          mt="md"
          className="footer-modal-schedule"
        >
          <Button
            w={100}
            variant="outline"
            color="red"
            onClick={() => onClose()}
          >
            Huỷ
          </Button>
          <Button
            loading={loading}
            w={100}
            bg={"var(--theme-color)"}
            type="submit"
            key="submit"
          >
            Cập nhật
          </Button>
        </Group>
      </form>
    </Box>
  );
};
