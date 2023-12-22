"use client";
import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye, IconPlus, IconBan } from "@tabler/icons-react";
import Link from "next/link";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const formats = [
  "header",
  "font",
  "size",
  "color",
  "background",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "align",
  "list",
  "bullet",
  "indent",
  "image",
];
export default function ProductSavePage() {
  const form = useForm({
    initialValues: {},
    validate: {},
  });
  return (
    <Box maw={"100%"} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid gutter={10}>
          <Grid.Col span={6}>
            <TextInput
              label="Tên sản phẩm"
              type="text"
              placeholder="Tên sản phẩm"
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              {...form.getInputProps("category")}
              label="Danh mục"
              checkIconPosition="right"
              placeholder="Danh mục"
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={10}>
          <Grid.Col span={6}>
            <NumberInput
              label="Giá bán"
              min={0}
              placeholder="Giá bán"
              thousandSeparator=","
              {...form.getInputProps("price")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              min={0}
              label="Giá sale"
              placeholder="Giá sale"
              thousandSeparator=","
              {...form.getInputProps("priceSale")}
            />
          </Grid.Col>
        </Grid>
        <Grid mt={24}>
          <Grid.Col span={12}>
            <>
              <Text size={"14px"} c={"#999999"} mb={"6px"}>
                Mô tả chi tiết
              </Text>
              <ReactQuill
                theme="snow"
                style={{ height: "400px" }}
                formats={formats}
                {...form.getInputProps("description")}
              />
            </>
          </Grid.Col>
        </Grid>
        <Grid mt={24}>
          <Grid.Col span={12}>
            <Textarea
              label="Mô tả ngắn"
              autosize={true}
              {...form.getInputProps("shortDescription")}
              placeholder="Mô tả ngắn"
            />
          </Grid.Col>
        </Grid>

        <Group justify="end" style={{ marginTop: 60 }}>
          <Link href={"/admin/product"}>
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
