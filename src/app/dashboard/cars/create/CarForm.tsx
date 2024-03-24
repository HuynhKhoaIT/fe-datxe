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
  Box,
  LoadingOverlay,
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
import {
  getOptionsBrands,
  getOptionsCustomers,
  getOptionsModels,
  getOptionsYearCar,
} from "@/utils/until";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
export default function CategoryForm({ isEditing, dataDetail }: any) {
  const [brandOptions, setBrandOptions] = useState<any>([]);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  const [loading, handlers] = useDisclosure();

  const form = useForm({
    initialValues: {
      numberPlates: "",
      color: "",
      vinNumber: "",
      machineNumber: "",
      description: "",
      status: isEditing ? dataDetail?.status : "PUBLIC",
      carStyleId: 1,
    },
    validate: {
      numberPlates: (value) => (value?.length > 0 ? null : "Vui lòng nhập..."),
    },
  });

  const router = useRouter();
  const handleSubmit = async (values: any) => {
    handlers.open();
    try {
      if (!isEditing) {
        await fetch(`/api/car`, {
          method: "POST",
          body: JSON.stringify(values),
        });
      } else {
        await fetch(`/api/car/${dataDetail?.id}`, {
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

  const [customerOptions, setCustomerOptions] = useState();
  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      const [customer, brands] = await Promise.all([
        getOptionsCustomers(),
        getOptionsBrands(),
      ]);
      setCustomerOptions(customer);
      setBrandOptions(brands);
      handlers.close();
    };

    if (!isEditing) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      handlers.open();

      if (isEditing && dataDetail) {
        try {
          const [customers, brands, models, yearCars] = await Promise.all([
            getOptionsCustomers(),
            getOptionsBrands(),
            getOptionsModels(dataDetail?.carBrandId),
            getOptionsYearCar(dataDetail?.carNameId),
          ]);
          setCustomerOptions(customers);
          setBrandOptions(brands);
          setModelOptions(models);
          setYearCarOptions(yearCars);

          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);
          form.setFieldValue("carBrandId", dataDetail?.carBrandId.toString());
          form.setFieldValue("carNameId", dataDetail?.carNameId.toString());
          form.setFieldValue("carYearId", dataDetail?.carYearId.toString());
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          handlers.close();
        }
      }
    };

    if (isEditing) fetchData();
  }, [dataDetail]);
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid gutter={10}>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    withAsterisk
                    {...form.getInputProps("numberPlates")}
                    size="lg"
                    radius={0}
                    label="Biển số xe"
                    type="text"
                    placeholder="Biển số xe"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("color")}
                    label="Màu xe"
                    type="text"
                    placeholder="Màu xe"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carBrandId")}
                    label="Hãng xe"
                    placeholder="Hãng xe"
                    data={brandOptions}
                    onChange={async (value) => {
                      const optionsData = await getOptionsModels(Number(value));
                      setModelOptions(optionsData);
                      form.setFieldValue("carBrandId", value);
                      form.setFieldValue("carNameId", null);
                      form.setFieldValue("carYearId", null);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carNameId")}
                    label="Dòng xe"
                    placeholder="Dòng xe"
                    data={modelOptions}
                    onChange={async (value) => {
                      const optionsData = await getOptionsYearCar(
                        Number(value)
                      );
                      setYearCarOptions(optionsData);
                      form.setFieldValue("carNameId", value);
                      form.setFieldValue("carYearId", null);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("carYearId")}
                    label="Năm sản xuất"
                    placeholder="Năm sản xuất"
                    data={yearCarOptions}
                    onChange={(value) => {
                      form.setFieldValue("carYearId", value);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("vinNumber")}
                    label="Số vin"
                    type="text"
                    placeholder="Số vin"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("machineNumber")}
                    label="Số máy"
                    type="text"
                    placeholder="Số máy"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("status")}
                    label="Trạng thái"
                    checkIconPosition="right"
                    placeholder="Trạng thái"
                    data={statusOptions}
                  />
                </Grid.Col>
              </Grid>
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <Textarea
                    size="lg"
                    radius={0}
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
        <Group justify="end" mt={20}>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            variant="outline"
            key="cancel"
            color="red"
            leftSection={<IconBan size={16} />}
            onClick={() => router.back()}
          >
            Huỷ
          </Button>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            loading={loading}
            style={{ marginLeft: "12px" }}
            key="submit"
            type="submit"
            variant="filled"
            leftSection={<IconPlus size={16} />}
          >
            {isEditing ? "Cập nhật" : "Thêm"}
          </Button>
        </Group>
      </form>
    </Box>
  );
}
