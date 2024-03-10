"use client";
import {
  Box,
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
  LoadingOverlay,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan } from "@tabler/icons-react";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { getDistricts, getWards } from "@/utils/notion";
export default function ExpertForm({
  isEditing,
  dataDetail,
  provinceData,
  districtData: dtData,
  wardData: wData,
}: any) {
  const [loading, handlers] = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const [districtData, setDistrictData] = useState<any>(dtData);
  const [wardData, setWardData] = useState<any>(wData);
  const [UltilitiesOptions, setUltilitiesOptions] = useState<any>([]);

  const handleProvince = async (value: any) => {
    try {
      const district: any = await getDistricts(value);
      const newDistrictData = district?.map((item: any) => ({
        value: item.id?.toString() || "",
        label: item.name || "",
      }));
      setDistrictData(newDistrictData);
    } catch (error) {}
  };
  const handleDistrict = async (value: any) => {
    try {
      const ward: any = await getWards(value);
      const newWardData = ward?.map((item: any) => ({
        value: item.id?.toString() || "",
        label: item.name || "",
      }));
      setWardData(newWardData);
    } catch (error) {}
  };
  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };
  const form = useForm({
    initialValues: {
      logo: "",

      description: "",
    },
    validate: {},
  });
  useEffect(() => {
    // handlers.open();

    const fetchData = async () => {
      try {
        form.setInitialValues(dataDetail);
        form.setValues(dataDetail);
        if (isEditing && dataDetail) {
          if (dataDetail?.amenities?.length > 0) {
            const dataOption = dataDetail?.amenities?.map((item: any) =>
              item.amenityId.toString()
            );
            form.setFieldValue("amenities", dataOption);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        handlers.close();
      }
    };

    if (isEditing) fetchData();
  }, [dataDetail]);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      const baseURL = "https://up-image.dlbd.vn/api/image";
      const options = { headers: { "Content-Type": "multipart/form-data" } };

      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      const response = await axios.post(baseURL, formData, options);
      values.logo = response.data;
    } catch (error) {
      console.error("Error:", error);
    }

    handlers.open();
    try {
      if (!isEditing) {
        await fetch(`/api/garage`, {
          method: "POST",
          body: JSON.stringify(values),
        });
      } else {
        await fetch(`/api/garage/${dataDetail?.id}`, {
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

  const getUltilities = async () => {
    const res = await fetch(`/api/amentity`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setUltilitiesOptions(dataOption);
  };
  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      await Promise.all([getUltilities()]);

      handlers.close();
    };

    fetchData();
  }, []);

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
              <Grid>
                <Grid.Col span={{ base: 12 }}>
                  <Text size={"16px"} c={"#999999"} mb={"6px"}>
                    Hình ảnh
                  </Text>
                  <FileButton
                    resetRef={resetRef}
                    onChange={setFile}
                    accept="image/png,image/jpeg"
                  >
                    {(props) => (
                      <Image
                        {...props}
                        radius="md"
                        h={150}
                        w={150}
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : dataDetail
                            ? dataDetail.image
                            : null
                        }
                        fallbackSrc="https://placehold.co/600x400?text=Upload"
                      />
                    )}
                  </FileButton>
                </Grid.Col>
              </Grid>
              <Grid gutter={10} mt={24}>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("code")}
                    label="Mã số"
                    type="text"
                    placeholder="Mã số"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("name")}
                    label="Tên chuyên gia"
                    type="text"
                    placeholder="Tên chuyên gia"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("shortName")}
                    label="Tên rút gọn"
                    type="text"
                    placeholder="Tên rút gọn"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("phoneNumber")}
                    label="Điện thoại"
                    type="text"
                    placeholder="Điện thoại"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("email")}
                    label="email"
                    type="text"
                    placeholder="email"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("website")}
                    label="Website"
                    type="text"
                    placeholder="Website"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                  <MultiSelect
                    size="lg"
                    radius={0}
                    withAsterisk
                    {...form.getInputProps("amenities")}
                    label="Tiện ích lân cận"
                    checkIconPosition="right"
                    placeholder="Tiện ích lân cận"
                    data={UltilitiesOptions}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 8, md: 8, lg: 8 }}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("address")}
                    label="Địa chỉ"
                    type="text"
                    placeholder="Địa chỉ"
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("address2")}
                    label="Địa chỉ 2"
                    type="text"
                    placeholder="Địa chỉ 2"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("provinceId")}
                    label="Tỉnh/Thành phố"
                    placeholder="Chọn tỉnh"
                    data={provinceData}
                    onChange={(value) => {
                      form.setFieldValue("provinceId", value);
                      form.setFieldValue("wardId", null);
                      form.setFieldValue("districtId", null);
                      handleProvince(Number(value));
                    }}
                  ></Select>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("districtId")}
                    label="Huyện/Quận"
                    placeholder="Chọn huyện/quận"
                    data={districtData}
                    onChange={(value) => {
                      form.setFieldValue("districtId", value);
                      form.setFieldValue("wardId", null);
                      handleDistrict(Number(value));
                    }}
                  ></Select>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("wardId")}
                    label="Xã/Phường"
                    placeholder="Chọn xã/phường"
                    data={wardData}
                    onChange={(value) => {
                      form.setFieldValue("wardId", value);
                    }}
                  ></Select>
                </Grid.Col>
              </Grid>
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <Textarea
                    label="Mô tả"
                    minRows={4}
                    autosize={true}
                    {...form.getInputProps("description")}
                    placeholder="Mô tả"
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 8, md: 4, lg: 4 }}>
                  <Select
                    size="lg"
                    radius={0}
                    {...form.getInputProps("status")}
                    label="Trạng thái"
                    checkIconPosition="right"
                    placeholder="Trạng thái"
                    data={[
                      { value: "PUBLIC", label: "Công khai" },
                      { value: "DRAFT", label: "Nháp" },
                      { value: "PENDING", label: "Đang duyệt" },
                    ]}
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
