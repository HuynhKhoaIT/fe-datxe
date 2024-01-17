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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan } from "@tabler/icons-react";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
export default function SupplierForm({ isEditing, dataDetail }: any) {
  const [loading, handlers] = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

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
    },
  });
  useEffect(() => {
    form.setInitialValues(dataDetail);
    form.setValues(dataDetail);
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
        await fetch(`/api/product-category`, {
          method: "POST",
          body: JSON.stringify(values),
        });
      } else {
        await fetch(`/api/product-category/${dataDetail?.id}`, {
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
              <Grid.Col span={8}>
                <TextInput
                  {...form.getInputProps("title")}
                  label="Tên danh mục"
                  type="text"
                  placeholder="Tên danh mục"
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
