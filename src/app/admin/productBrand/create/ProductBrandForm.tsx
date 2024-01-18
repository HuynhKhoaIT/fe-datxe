"use client";
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  TextInput,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan } from "@tabler/icons-react";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { statusOptions } from "@/constants/masterData";
export default function ProductBrandForm({ isEditing, dataDetail }: any) {
  const [loading, handlers] = useDisclosure();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      status: isEditing ? dataDetail?.status : "PUBLIC",
    },
    validate: {
      name: (value) => (value.length < 1 ? "Không được để trống" : null),
      status: (value) => (!value ? "Không được để trống" : null),
    },
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
        await fetch(`/api/product-brands`, {
          method: "POST",
          body: JSON.stringify(values),
        });
      } else {
        await fetch(`/api/product-brands/${dataDetail?.id}`, {
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
            <Grid gutter={10} mt={24}>
              <Grid.Col span={8}>
                <TextInput
                  withAsterisk
                  {...form.getInputProps("name")}
                  label="Tên thương hiệu"
                  type="text"
                  placeholder="Tên thương hiệu"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Trạng thái"
                  checkIconPosition="right"
                  placeholder="Trạng thái"
                  data={statusOptions}
                  {...form.getInputProps("status")}
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
