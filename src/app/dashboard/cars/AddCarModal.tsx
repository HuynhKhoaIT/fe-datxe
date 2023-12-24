"use client";
import { ICar } from "@/interfaces/car";
import { getBrands, getModels } from "@/utils/branch";
import { addCar, getCars, setCarDefault } from "@/utils/car";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Modal,
  TextInput,
  Box,
  Select,
  Button,
  Group,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { IBrand } from "@/interfaces/brand";
import { useRouter } from "next/navigation";
import { IconPlus, IconBan } from "@tabler/icons-react";
import BasicModal from "@/app/components/basicModal/BasicModal";
import { useForm, hasLength } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

const AddCarModal = ({ opened, close, fetchCars, ...props }: any) => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [loading, handlers] = useDisclosure();

  const router = useRouter();
  const [brandsData, setBrandsData] = useState<any>([]);
  const [models, setModels] = useState<any>([]);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBrands();
        const newFormat = data?.map((brand) => ({
          value: brand.id?.toString() || "",
          label: brand.name || "",
        }));
        setBrandsData(newFormat);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const form = useForm({
    initialValues: {},
    validate: {},
  });
  const handleCreateCar = async (values: any) => {
    handlers.open();
    try {
      const newCar = {
        ...values,
        customer_id: session?.user?.id,
        date_repairt: dayjs(values?.date_repairt).format("YYYY-MM-DD"),
        civil_insurance_deadline: dayjs(
          values?.civil_insurance_deadline
        ).format("YYYY-MM-DD"),
        material_insurance_deadline: dayjs(
          values?.material_insurance_deadline
        ).format("YYYY-MM-DD"),
        registration_deadline: dayjs(values?.registration_deadline).format(
          "YYYY-MM-DD"
        ),
      };
      const createdCar = await addCar(newCar, token ?? "");
      const cars: any = await getCars(token ?? "");

      if (cars?.length < 2) {
        try {
          const carDefault = await setCarDefault(cars[0]?.id, token ?? "");
        } catch (error) {
          console.error("Error set car:", error);
        }
      }
      close();
      fetchCars();
      notifications.show({
        title: "Thành công",
        message: "Thêm xe thành công",
      });
      handlers.close();
    } catch (error) {
      close();
      notifications.show({
        title: "Thất bại",
        message: `${error}`,
      });
      handlers.close();
      console.error("Error creating car:", error);
    }
  };

  return (
    <BasicModal
      size={800}
      title="Thêm xe"
      isOpen={opened}
      closeButtonProps
      onCloseModal={close}
      lockScroll={false}
      {...props}
    >
      <Box maw={800} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleCreateCar(values))}>
          <Grid gutter={10}>
            <Grid.Col span={4}>
              <TextInput
                label="Biển số xe"
                type="text"
                placeholder="Biển số xe"
                {...form.getInputProps("number_plates")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                {...form.getInputProps("brand_id")}
                label="Hãng xe"
                checkIconPosition="right"
                placeholder="Chọn hãng xe"
                data={brandsData}
                onChange={(value) => {
                  form.setFieldValue("brand_id", value);
                  selectBrand(Number(value));
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Dòng xe"
                checkIconPosition="right"
                placeholder="Chọn dòng xe"
                data={models}
                {...form.getInputProps("car_name_id")}
              ></Select>
            </Grid.Col>
          </Grid>
          <Grid gutter={10}>
            <Grid.Col span={4}>
              <TextInput
                label="Color"
                type="text"
                placeholder="Màu xe"
                {...form.getInputProps("color")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Vin number"
                placeholder="Vin Number"
                {...form.getInputProps("vin_number")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Machine Number"
                placeholder="Machine Number"
                {...form.getInputProps("machine_number")}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={10}>
            <Grid.Col span={4}>
              <NumberInput
                label="Km repairt"
                placeholder="Km repairt"
                {...form.getInputProps("km_repairt")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <DateInput
                label="Date Repairt"
                valueFormat={"DD/MM/YYYY"}
                placeholder="Date Repairt"
                {...form.getInputProps("date_repairt")}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter={10}>
            <Grid.Col span={4}>
              <DateInput
                label="Registration Deadline"
                valueFormat={"DD/MM/YYYY"}
                placeholder="Registration Deadline"
                {...form.getInputProps("registration_deadline")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <DateInput
                label="Civil deadline"
                valueFormat={"DD/MM/YYYY"}
                placeholder="Civil deadline"
                {...form.getInputProps("civil_insurance_deadline")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <DateInput
                label="Material deadline"
                valueFormat={"DD/MM/YYYY"}
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
              variant="outline"
              key="cancel"
              onClick={close}
              color="red"
              leftSection={<IconBan size={16} />}
            >
              Huỷ bỏ
            </Button>
            <Button
              style={{ marginLeft: "12px" }}
              key="submit"
              type="submit"
              variant="filled"
              loading={loading}
              leftSection={<IconPlus size={16} />}
            >
              Thêm xe
            </Button>
          </Group>
        </form>
      </Box>
    </BasicModal>
  );
};
export default AddCarModal;
