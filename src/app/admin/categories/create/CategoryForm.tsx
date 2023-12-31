"use client";
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan } from "@tabler/icons-react";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
export default function CategoryForm({ isEditing, dataDetail }: any) {
  const [loading, handlers] = useDisclosure();
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
    str = str.replace(/[^\w\-]+/g, ""); // Loại bỏ các ký tự đặc biệt
    return str;
  }
  const handleSubmit = async (values: any) => {
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
    <Box w="800px">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={12}>
          <Grid.Col span={12}>
            <Card withBorder shadow="sm">
              <Grid gutter={10}>
                <Grid.Col span={12}>
                  <TextInput
                    {...form.getInputProps("title")}
                    label="Tên danh mục"
                    type="text"
                    placeholder="Tên danh mục"
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
            Thêm
          </Button>
        </Group>
      </form>
    </Box>
  );
}
