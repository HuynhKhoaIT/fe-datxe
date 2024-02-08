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
      image: "",
      title: "",
      description: "",
    },
    validate: {
      title: (value) => (value.length < 1 ? "Không được để trống" : null),
      image: (value) => (value.length < 1 ? "Không được để trống" : null),
    },
  });
  useEffect(() => {
    // handlers.open();

    const fetchData = async () => {
      try {
        form.setInitialValues(dataDetail);
        form.setValues(dataDetail);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        handlers.close();
      }
    };

    if (isEditing) fetchData();
  }, [dataDetail]);
  const router = useRouter();
  function convertToSlug(str: string) {
    str = str.toLowerCase().trim(); // Chuyển đổi thành chữ thường và loại bỏ khoảng trắng ở đầu và cuối chuỗi
    str = str.replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang
    str = str.replace(/[^\w\-]+/g, ""); // Loại bỏ các ký tự đặc biệt.
    return str;
  }
  const handleSubmit = async (values: any) => {
    try {
      const baseURL = "https://up-image.dlbd.vn/api/image";
      const options = { headers: { "Content-Type": "multipart/form-data" } };

      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      const response = await axios.post(baseURL, formData, options);
      values.image = response.data;
    } catch (error) {
      console.error("Error:", error);
    }

    values.slug = convertToSlug(values?.title);
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
                <Grid.Col span={12}>
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
                <Grid.Col span={4}>
                  <TextInput
                    {...form.getInputProps("code")}
                    label="Mã số"
                    type="text"
                    placeholder="Mã số"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    {...form.getInputProps("name")}
                    label="Tên chuyên gia"
                    type="text"
                    placeholder="Tên chuyên gia"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    {...form.getInputProps("shortName")}
                    label="Tên rút gọn"
                    type="text"
                    placeholder="Tên rút gọn"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    {...form.getInputProps("phoneNumber")}
                    label="Điện thoại"
                    type="text"
                    placeholder="Điện thoại"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    {...form.getInputProps("email")}
                    label="email"
                    type="text"
                    placeholder="email"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    {...form.getInputProps("website")}
                    label="Website"
                    type="text"
                    placeholder="Website"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    {...form.getInputProps("website")}
                    label="Số tài khoản"
                    type="text"
                    placeholder="Số tài khoản"
                  />
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextInput
                    {...form.getInputProps("website")}
                    label="Tên ngân hàng"
                    type="text"
                    placeholder="Tên ngân hàng"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    {...form.getInputProps("website")}
                    label="Mã số thuế"
                    type="text"
                    placeholder="Mã số thuế"
                  />
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextInput
                    {...form.getInputProps("website")}
                    label="Địa chỉ"
                    type="text"
                    placeholder="Địa chỉ"
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    {...form.getInputProps("website")}
                    label="Địa chỉ 2"
                    type="text"
                    placeholder="Địa chỉ 2"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 4, md: 4, lg: 4 }}>
                  <Select
                    {...form.getInputProps("province_id")}
                    label="Tỉnh/Thành phố"
                    placeholder="Chọn tỉnh"
                    data={provinceData}
                    onChange={(value) => {
                      form.setFieldValue("province_id", value);
                      form.setFieldValue("ward_id", null);
                      form.setFieldValue("district_id", null);
                      handleProvince(Number(value));
                    }}
                  ></Select>
                </Grid.Col>
                <Grid.Col span={{ base: 4, md: 4, lg: 4 }}>
                  <Select
                    {...form.getInputProps("district_id")}
                    label="Huyện/Quận"
                    placeholder="Chọn huyện/quận"
                    data={districtData}
                    onChange={(value) => {
                      form.setFieldValue("district_id", value);
                      form.setFieldValue("ward_id", null);
                      handleDistrict(Number(value));
                    }}
                  ></Select>
                </Grid.Col>
                <Grid.Col span={{ base: 4, md: 4, lg: 4 }}>
                  <Select
                    {...form.getInputProps("ward_id")}
                    label="Xã/Phường"
                    placeholder="Chọn xã/phường"
                    data={wardData}
                    onChange={(value) => {
                      form.setFieldValue("ward_id", value);
                    }}
                  ></Select>
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
                <Grid.Col span={12}>
                  <Textarea
                    label="Mô tả ngắn"
                    minRows={4}
                    autosize={true}
                    {...form.getInputProps("sortDescription")}
                    placeholder="Mô tả ngắn"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Select
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

        <Group justify="end" style={{ marginTop: 60, padding: "20px" }}>
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
            {isEditing ? "Cập nhật" : "Thêm"}
          </Button>
        </Group>
      </form>
    </Box>
  );
}
