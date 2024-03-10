"use client";
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan } from "@tabler/icons-react";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import DateField from "@/app/components/form/DateField";
import { IBrand } from "@/interfaces/brand";
import { getModels, getYears } from "@/utils/branch";
import dayjs from "dayjs";
import { addCar, getCars, setCarDefault, updateCar } from "@/utils/car";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function CarForm({
  isEditing = false,
  dataDetail = [],
  brandOptions = [],
  modelOption = [],
}: any) {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const router = useRouter();

  const [loading, handlers] = useDisclosure();
  const [models, setModels] = useState<any>(modelOption);
  const [yearCar, setYearCar] = useState<any>([]);

  const form = useForm({
    initialValues: {
      automakerId: dataDetail?.automakerId,
      yearCarName: dataDetail?.yearCarName,
      carNameId: dataDetail?.carNameId,
    },
    validate: {},
  });

  const selectBrand = async (value: number) => {
    try {
      const dong_xe: IBrand[] = await getModels(value);
      const newModels = dong_xe?.map((model) => ({
        value: model.id?.toString() || "",
        label: model.name || "",
      }));
      setModels(newModels);
    } catch (error) {}
  };
  const selectYearCar = async (value: number) => {
    try {
      const yearCarData: IBrand[] = await getYears(value);
      const newYearCar = yearCarData?.map((year) => ({
        value: year.id?.toString() || "",
        label: year.name || "",
      }));
      setYearCar(newYearCar);
    } catch (error) {}
  };

  useEffect(() => {
    if (isEditing) {
      form.setInitialValues(dataDetail);
      form.setValues(dataDetail);

      if (dataDetail?.date_repairt) {
        form.setFieldValue(
          "date_repairt",
          dayjs(dataDetail?.date_repairt).add(1, "day")
        );
      }
      if (dataDetail?.civilInsuranceDate) {
        form.setFieldValue(
          "civil_insurance_deadline",
          dayjs(dataDetail?.civilInsuranceDate).add(1, "day")
        );
      }
      if (dataDetail?.materialInsuranceDate) {
        form.setFieldValue(
          "material_insurance_deadline",
          dayjs(dataDetail?.materialInsuranceDate).add(1, "day")
        );
      }
      if (dataDetail?.registrationDate) {
        form.setFieldValue(
          "registration_deadline",
          dayjs(dataDetail?.registrationDate).add(1, "day")
        );
      }
      selectYearCar(dataDetail?.carNameId);
    }
  }, [dataDetail]);
  const handleSubmit = async (values: any) => {
    handlers.open();
    const newCar = {
      ...values,
      number_plates: values?.licensePlates,
      brand_id: values?.automakerId,
      year_car_name: values?.yearCarName,
      car_name_id: values?.carNameId,
      vin_number: values?.vinNumber,
    };
    if (isEditing) {
      try {
        await updateCar(dataDetail.id, newCar, token ?? "");
        router.back();
        notifications.show({
          title: "Thành công",
          message: "Cập nhật xe thành công",
        });
      } catch (error) {
        notifications.show({
          title: "Thất bại",
          message: "Cập nhật xe thất bại",
        });
      }
    } else {
      try {
        await addCar(newCar, token ?? "");
        const cars: any = await getCars(token ?? "");
        if (cars?.length < 2) {
          try {
            const carDefault = await setCarDefault(cars[0]?.id, token ?? "");
          } catch (error) {
            console.error("Error set car:", error);
          }
        }
        router.back();
        notifications.show({
          title: "Thành công",
          message: "Thêm thành công",
        });
      } catch (error) {
        notifications.show({
          title: "Thất bại",
          message: "Thêm xe thất bại",
        });
      }
    }
    router.refresh();
    handlers.close();
  };

  return (
    <Box maw={800} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={10}>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <TextInput
              size="lg"
              radius={0}
              label="Biển số xe"
              type="text"
              placeholder="Biển số xe"
              {...form.getInputProps("licensePlates")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <Select
              size="lg"
              radius={0}
              data={brandOptions}
              {...form.getInputProps("automakerId")}
              label="Hãng xe"
              checkIconPosition="right"
              placeholder="Chọn hãng xe"
              onChange={(value) => {
                form.setFieldValue("automakerId", value);
                selectBrand(Number(value));
              }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <Select
              size="lg"
              radius={0}
              {...form.getInputProps("carNameId")}
              label="Dòng xe"
              checkIconPosition="right"
              placeholder="Chọn dòng xe"
              data={models}
              onChange={(value) => {
                form.setFieldValue("carNameId", value);
                selectYearCar(Number(value));
              }}
            ></Select>
          </Grid.Col>
        </Grid>
        <Grid gutter={10}>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <Select
              size="lg"
              radius={0}
              label="Năm sản xuất"
              checkIconPosition="right"
              placeholder="Năm sản xuất"
              data={yearCar}
              {...form.getInputProps("yearCarName")}
            ></Select>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <TextInput
              size="lg"
              radius={0}
              label="Color"
              type="text"
              placeholder="Màu xe"
              {...form.getInputProps("color")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <NumberInput
              size="lg"
              radius={0}
              label="Vin number"
              placeholder="Vin Number"
              {...form.getInputProps("vinNumber")}
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={10}>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <NumberInput
              size="lg"
              radius={0}
              label="Machine Number"
              placeholder="Machine Number"
              {...form.getInputProps("machine_number")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <NumberInput
              size="lg"
              radius={0}
              label="Km repairt"
              placeholder="Km repairt"
              {...form.getInputProps("km_repairt")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <DateField
              label="Date Repairt"
              placeholder="Date Repairt"
              {...form.getInputProps("date_repairt")}
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={10}>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <DateField
              label="Registration Deadline"
              placeholder="Registration Deadline"
              {...form.getInputProps("registration_deadline")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <DateField
              label="Civil deadline"
              placeholder="Civil deadline"
              {...form.getInputProps("civil_insurance_deadline")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
            <DateField
              label="Material deadline"
              placeholder="Material deadline"
              {...form.getInputProps("material_insurance_deadline")}
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={12}>
            <Textarea
              label="Mô tả chi tiết"
              maxLength={100}
              {...form.getInputProps("description")}
              placeholder="Mô tả chi tiết"
            />
          </Grid.Col>
        </Grid>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            size="lg"
            radius={0}
            variant="outline"
            key="cancel"
            color="red"
            leftSection={<IconBan size={16} />}
            onClick={() => router.back()}
          >
            Huỷ bỏ
          </Button>
          <Button
            size="lg"
            radius={0}
            style={{ marginLeft: "12px" }}
            key="submit"
            type="submit"
            variant="filled"
            loading={loading}
            leftSection={<IconPlus size={16} />}
          >
            {isEditing ? "Cập nhật" : "Thêm xe"}
          </Button>
        </Group>
      </form>
    </Box>
  );
}
