"use client";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Space,
  Switch,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconEye,
  IconPlus,
  IconBan,
  IconDownload,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";
import { BasicDropzone } from "@/app/components/form/DropZone";
import Typo from "@/app/components/elements/Typo";

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
  const [car, setCar] = useState([{ car: "" }]);
  const addCar = () => {
    if (car.length < 9) {
      setCar([...car, { car: "" }]);
    }
  };

  const removeCar = (index: number) => {
    const newCar = [...car];
    newCar.splice(index, 1);
    setCar(newCar);
  };

  const handleChange = (index: number, value: any) => {
    const newCar = [...car];
    newCar[index].car = value;
    setCar(newCar);
  };
  return (
    <Box maw={"100%"} mx="auto" mt={20}>
      <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Cập nhật sản phẩm
      </Typo>
      <Space h="md" />
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid gutter={12}>
          <Grid.Col span={8}>
            <Card withBorder shadow="sm">
              <Grid gutter={10}>
                <Grid.Col span={12}>
                  <TextInput
                    label="Tên sản phẩm"
                    type="text"
                    placeholder="Tên sản phẩm"
                    {...form.getInputProps("name")}
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
                <Grid.Col span={6}>
                  <DateTimePicker
                    label="Thời gian bắt đầu"
                    placeholder="Thời gianbắt đầu"
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <DateTimePicker
                    label="Thời gian kết thúc"
                    placeholder="Thời giankết thúc"
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
                    minRows={4}
                    autosize={true}
                    {...form.getInputProps("shortDescription")}
                    placeholder="Mô tả ngắn"
                  />
                </Grid.Col>
              </Grid>
              <Card
                shadow="sm"
                padding="lg"
                withBorder
                title="Áp dụng dòng xe"
                mt={24}
              >
                {car.map((item, index) => (
                  <Flex
                    gap={12}
                    w={"100%"}
                    align={"end"}
                    justify="space-between"
                  >
                    <Flex gap={12} w={"90%"}>
                      <Select
                        w={"33%"}
                        label="Hãng xe"
                        placeholder="Hãng xe"
                        data={["React", "Angular", "Vue", "Svelte"]}
                      />
                      <Select
                        w={"33%"}
                        label="Dòng xe"
                        placeholder="Dòng xe"
                        data={["React", "Angular", "Vue", "Svelte"]}
                      />
                      <MultiSelect
                        w={"33%"}
                        label="Năm sản xuất"
                        placeholder="Năm sản xuất"
                        data={["2023", "2022", "2021", "2020"]}
                      />
                    </Flex>
                    <Button
                      onClick={() => removeCar(index)}
                      variant="outline"
                      color="red"
                    >
                      <IconTrash size={16} />
                    </Button>
                  </Flex>
                ))}
                <Flex justify="end" mt={12}>
                  <Button onClick={addCar} size="md">
                    <IconPlus size={16} />
                  </Button>
                </Flex>
              </Card>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card withBorder shadow="sm">
              <Grid>
                <Grid.Col span={12}>
                  <Select
                    {...form.getInputProps("category")}
                    label="Danh mục"
                    checkIconPosition="right"
                    placeholder="Danh mục"
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={12}>
                  <Select
                    {...form.getInputProps("category")}
                    label="Loại hình sản phẩm"
                    checkIconPosition="right"
                    placeholder="Loại hình sản phẩm"
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <BasicDropzone />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Switch onLabel="ON" offLabel="OFF" label="Quản lý kho" />
                </Grid.Col>
              </Grid>
              <Grid gutter={10}>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Số lượng"
                    min={0}
                    placeholder="Số lượng"
                    thousandSeparator=","
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    min={0}
                    label="Số lượng cảnh báo"
                    placeholder="Số lượng cảnh báo"
                    thousandSeparator=","
                    {...form.getInputProps("priceSale")}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Switch onLabel="ON" offLabel="OFF" label="Công khai" />
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
