"use client";
import {
  Button,
  Card,
  Grid,
  Group,
  TextInput,
  Textarea,
  Select,
  Autocomplete,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan } from "@tabler/icons-react";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { sexOptions, statusOptions } from "@/constants/masterData";
import DateField from "@/app/components/form/DateField";
import dayjs from "dayjs";
export default function CustomersForm({ isEditing, dataDetail }: any) {
  const [loading, handlers] = useDisclosure();
  const form = useForm({
    initialValues: {
      fullName: "",
      cityId: "",
      description: "",
      phoneNumber: "",
      districtId: "",
      wardId: "",
      address: "",
      status: isEditing ? dataDetail?.status : "PUBLIC",
    },
    validate: {
      fullName: (value) => (value.length < 1 ? "Không được để trống" : null),
      phoneNumber: (value) => (value.length < 1 ? "Không được để trống" : null),
      cityId: (value) => (value.length < 1 ? "Không được để trống" : null),
      districtId: (value) => (value.length < 1 ? "Không được để trống" : null),
      wardId: (value) => (value.length < 1 ? "Không được để trống" : null),
      // address: (value) => (value.length < 1 ? "Không được để trống" : null),
    },
  });

  const router = useRouter();

  const handleSubmit = async (values: any) => {
    values.garageId = 1;
    handlers.open();
    try {
      if (!isEditing) {
        await fetch(`/api/customer`, {
          method: "POST",
          body: JSON.stringify(values),
        });
      } else {
        await fetch(`/api/customer/${dataDetail?.id}`, {
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

  const [provinceOptions, setProvinceOptions] = useState<any>([]);
  const [districtOptions, setDistrictOptions] = useState<any>([]);
  const [wardOptions, setWardOptions] = useState<any>([]);
  const [province, setProvince] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [ward, setWard] = useState<string>();

  const getProvinces = async () => {
    const res = await fetch(`${process.env.apiGuest}/provinces`, {
      method: "GET",
    });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.name,
    }));
    setProvinceOptions(dataOption);
  };
  const getDistricts = async (provinceId: number) => {
    const res = await fetch(
      `${process.env.apiGuest}/get-districts/${provinceId}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.name,
    }));
    setDistrictOptions(dataOption);
  };
  const getWards = async (districtId: number) => {
    const res = await fetch(`${process.env.apiGuest}/get-wards/${districtId}`, {
      method: "GET",
    });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.name,
    }));
    setWardOptions(dataOption);
  };

  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      await Promise.all([getProvinces()]);
      handlers.close();
    };
    if (!isEditing) fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      if (isEditing && dataDetail) {
        try {
          await Promise.all([
            getProvinces(),
            getDistricts(Number(dataDetail?.cityId)),
            getWards(Number(dataDetail?.districtId)),
          ]);

          form.setInitialValues(dataDetail);
          form.setValues(dataDetail);
          form.setFieldValue("cityId", dataDetail?.cityId?.toString());
          setProvince(dataDetail?.cityId?.toString());
          form.setFieldValue("districId", dataDetail?.districtId?.toString());
          setDistrict(dataDetail?.districtId?.toString());
          form.setFieldValue("wardId", dataDetail?.wardId?.toString());
          setWard(dataDetail?.wardId?.toString());
          if (dataDetail?.dob)
            form.setFieldValue("dob", dayjs(dataDetail?.dob).toDate());
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
      />{" "}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid gutter={10} mt={24}>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("fullName")}
                    label="Họ và tên"
                    type="text"
                    placeholder="Họ và tên"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("phoneNumber")}
                    label="Số điện thoại"
                    type="text"
                    placeholder="Số điện thoại"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 6, sm: 4, md: 2, lg: 2 }}>
                  <DateField
                    {...form.getInputProps("dob")}
                    label="Ngày sinh"
                    placeholder="Ngày sinh"
                    clearable={true}
                    maxDate={new Date()}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 6, sm: 4, md: 2, lg: 2 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("sex")}
                    label="Giới tính"
                    checkIconPosition="right"
                    placeholder="Giới tính"
                    data={sexOptions}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Autocomplete
                    withAsterisk
                    {...form.getInputProps("cityId")}
                    label="Tỉnh/Thành phố"
                    placeholder="Tỉnh/Thành phố"
                    data={provinceOptions}
                    onOptionSubmit={(value) => {
                      form.setFieldValue("cityId", value);
                      getDistricts(Number(value));
                      form.setFieldValue("districtId", "");
                      form.setFieldValue("wardId", "");
                      setDistrict("");
                      setWard("");
                    }}
                    onChange={(value) => {
                      setProvince(value);
                    }}
                    value={province}
                    selectFirstOptionOnChange
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Autocomplete
                    withAsterisk
                    {...form.getInputProps("districtId")}
                    label="Huyện/Phường"
                    placeholder="Huyện/Phường"
                    data={districtOptions}
                    onOptionSubmit={(value) => {
                      getWards(Number(value));
                      form.setFieldValue("districtId", value);
                      form.setFieldValue("wardId", "");
                      setWard("");
                    }}
                    onChange={(value) => {
                      setDistrict(value);
                    }}
                    value={district}
                    disabled={!form.getInputProps("cityId").value}
                    selectFirstOptionOnChange
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <Autocomplete
                    withAsterisk
                    {...form.getInputProps("wardId")}
                    disabled={
                      !form.getInputProps("cityId").value ||
                      !form.getInputProps("districtId").value
                    }
                    label="Xã/Thị trấn"
                    placeholder="Xã/Thị trấn"
                    data={wardOptions}
                    onOptionSubmit={(value) => {
                      form.setFieldValue("wardId", value);
                    }}
                    onChange={(value) => {
                      setWard(value);
                    }}
                    value={ward}
                    selectFirstOptionOnChange
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8, md: 8, lg: 8 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("address")}
                    label="Địa chỉ"
                    type="text"
                    placeholder="Địa chỉ"
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
            size="lg"
            radius={0}
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
