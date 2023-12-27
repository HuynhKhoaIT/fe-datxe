"use client";
import { Button, Card, Grid, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan } from "@tabler/icons-react";
import Link from "next/link";
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
    validate: {},
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
        await fetch(`/api/product-category`, {
          method: "POST",
          body: JSON.stringify(values),
        });
      } else {
        await fetch(`/api/product-category/${dataDetail?.productId}`, {
          method: "PUT",
          body: JSON.stringify(values),
        });
      }
      handlers.close();
      router.push("/admin/categories");
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
        <Grid.Col span={8}>
          <Card withBorder shadow="sm">
            <Grid gutter={10}>
              <Grid.Col span={12}>
                <TextInput
                  {...form.getInputProps("title")}
                  label="Tên danh mucj"
                  type="text"
                  placeholder="Tên danh mục"
                />
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
            </Grid>
          </Card>
        </Grid.Col>
      </Grid>

      <Group justify="end" style={{ marginTop: 60 }}>
        <Link href={"/admin/products"}>
          <Button
            variant="outline"
            key="cancel"
            color="red"
            leftSection={<IconBan size={16} />}
          >
            Huỷ bỏ
          </Button>
        </Link>
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
