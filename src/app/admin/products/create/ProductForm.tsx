"use client";
import {
  Button,
  Card,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Switch,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconBan } from "@tabler/icons-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { BasicDropzone } from "@/app/components/form/DropZone";
import InfoCar from "../[slug]/InfoCar";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import DateTimeField from "@/app/components/form/DateTimeField";
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
export default function ProductForm({
  isEditing = false,
  dataDetail,
  categoryOptions = [],
  isDirection = false,
}: any) {
  const [loading, handlers] = useDisclosure();
  const form = useForm({
    initialValues: {
      name: "",
      categories: [],
    },
    validate: {
      name: (value) => (value.length < 1 ? "Không được để trống" : null),
      categories: (value) => (value.length < 1 ? "Không được để trống" : null),
    },
  });
  useEffect(() => {
    if (!isEditing) {
      form.setFieldValue("isProduct", "1");
    }
    if (isEditing && dataDetail) {
      form.setInitialValues(dataDetail);
      form.setValues(dataDetail);
      if (dataDetail?.brandDetail) {
        form.setFieldValue("brands", JSON?.parse(dataDetail?.brandDetail));
        setCar(JSON?.parse(dataDetail?.brandDetail));
      }
      if (dataDetail?.timeSaleEnd) {
        form.setFieldValue(
          "timeSaleEnd",
          dayjs(dataDetail?.timeSaleEnd).toDate()
        );
      }
      if (dataDetail?.timeSaleStart) {
        form.setFieldValue(
          "timeSaleStart",
          dayjs(dataDetail?.timeSaleStart).toDate()
        );
      }
      if (dataDetail?.isProduct) {
        form.setFieldValue("isProduct", dataDetail?.isProduct.toString());
      }
      if (dataDetail?.categories?.length > 0) {
        const dataOption = dataDetail?.categories?.map((item: any) =>
          item.categoryId.toString()
        );
        form.setFieldValue("categories", dataOption);
      }
    }
    if (isDirection) {
      form.setFieldValue("name", dataDetail?.name);
      form.setFieldValue("price", dataDetail?.price);
      form.setFieldValue("description", dataDetail?.description);
    }
  }, [dataDetail]);
  const router = useRouter();
  const [car, setCar] = useState([{ brandId: "", nameId: "", yearId: "" }]);

  const handleChangeBrand = (index: number, value: any) => {
    const newCar = [...car];
    newCar[index].brandId = value;
    newCar[index].nameId = "";
    newCar[index].yearId = "";
    setCar(newCar);
  };

  const handleChangeNameCar = (index: number, value: any) => {
    const newCar = [...car];
    newCar[index].nameId = value;
    newCar[index].yearId = "";
    setCar(newCar);
  };
  const handleChangeYearCar = (index: number, value: any) => {
    const newCar = [...car];
    newCar[index].yearId = value.join(",");

    setCar(newCar);
  };
  const handleSubmit = async (values: any) => {
    values.title = values.name;
    values.brands = car;
    if (isDirection) {
      values.garageId = dataDetail?.garageId;
    }
    handlers.open();
    try {
      if (!isEditing) {
        await fetch(`/api/products`, {
          method: "POST",
          body: JSON.stringify(values),
        });
      } else {
        await fetch(`/api/products/${dataDetail?.id}`, {
          method: "PUT",
          body: JSON.stringify(values),
        });
      }
      handlers.close();
      router.back();
      router.refresh();
      notifications.show({
        title: "Thành công",
        message: "Thêm sản phẩm thành công",
      });
    } catch (error) {
      handlers.close();
      notifications.show({
        title: "Thất bại",
        message: "Thêm sản phẩm thất bại",
      });
    }
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} style={{ padding: "20px" }}>
      <Grid gutter={12}>
        <Grid.Col span={8}>
          <Card withBorder shadow="sm">
            <Grid gutter={10}>
              <Grid.Col span={8}>
                <TextInput
                  withAsterisk
                  {...form.getInputProps("name")}
                  label="Tên sản phẩm"
                  type="text"
                  placeholder="Tên sản phẩm"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  {...form.getInputProps("isProduct")}
                  label="Loại"
                  checkIconPosition="right"
                  placeholder="Loại"
                  data={[
                    { value: "1", label: "Sản phẩm" },
                    { value: "0", label: "Dịch vụ" },
                  ]}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter={10}>
              <Grid.Col span={6}>
                <NumberInput
                  {...form.getInputProps("price")}
                  label="Giá bán"
                  min={0}
                  placeholder="Giá bán"
                  thousandSeparator=","
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  {...form.getInputProps("salePrice")}
                  min={0}
                  label="Giá sale"
                  placeholder="Giá sale"
                  thousandSeparator=","
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DateTimeField
                  {...form.getInputProps("timeSaleStart")}
                  label="Thời gian bắt đầu"
                  placeholder="Thời gian bắt đầu"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DateTimeField
                  {...form.getInputProps("timeSaleEnd")}
                  label="Thời gian kết thúc"
                  placeholder="Thời giankết thúc"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <MultiSelect
                  withAsterisk
                  {...form.getInputProps("categories")}
                  label="Danh mục"
                  checkIconPosition="right"
                  placeholder="Danh mục"
                  data={categoryOptions}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  {...form.getInputProps("quantity")}
                  label="Số lượng"
                  min={0}
                  placeholder="Số lượng"
                  thousandSeparator=","
                />
              </Grid.Col>
            </Grid>
            <Grid mt={24}>
              <Grid.Col span={12}>
                <>
                  {/* <Text size={"14px"} c={"#999999"} mb={"6px"}>
                    Mô tả chi tiết
                  </Text> */}
                  <Textarea
                    label="Mô tả chi tiết"
                    minRows={6}
                    autosize={true}
                    {...form.getInputProps("metaDescription")}
                    placeholder="Mô tả chi tiết"
                  />
                  {/* <ReactQuill
                    theme="snow"
                    style={{ height: "400px" }}
                    formats={formats}
                    {...form.getInputProps("metaDescription")}
                  /> */}
                </>
              </Grid.Col>
            </Grid>
            <Grid mt={24}>
              <Grid.Col span={12}>
                <Textarea
                  label="Mô tả ngắn"
                  minRows={4}
                  autosize={true}
                  {...form.getInputProps("description")}
                  placeholder="Mô tả ngắn"
                />
              </Grid.Col>
            </Grid>
            <InfoCar
              carData={car}
              setCar={setCar}
              handleChangeBrand={handleChangeBrand}
              handleChangeNameCar={handleChangeNameCar}
              handleChangeYearCar={handleChangeYearCar}
            />
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card withBorder shadow="sm">
            <Grid>
              <Grid.Col span={12}>
                <Select
                  {...form.getInputProps("status")}
                  label="Trạng thái"
                  checkIconPosition="right"
                  placeholder="Trạng thái"
                  data={[
                    { value: "PUBLIC", label: "Công khai" },
                    { value: "DRAFT", label: "Nháp" },
                    { value: "PENDING", label: "Đang duyệt" },
                    { value: "DELETE", label: "Xoá" },
                  ]}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <BasicDropzone />
              </Grid.Col>
              {/* <Grid.Col span={12}>
                <Switch onLabel="ON" offLabel="OFF" label="Quản lý kho" />
              </Grid.Col> */}
            </Grid>
            <Grid gutter={10} mt={24}>
              {/*               
              <Grid.Col span={6}>
                <NumberInput
                  min={0}
                  label="Số lượng cảnh báo"
                  placeholder="Số lượng cảnh báo"
                  thousandSeparator=","
                  {...form.getInputProps("priceSale")}
                />
              </Grid.Col> */}
              <Grid.Col span={12}>
                <Switch onLabel="ON" offLabel="OFF" label="Công khai" />
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
          {isEditing ? "Cập nhật" : "Thêm"}
        </Button>
      </Group>
    </form>
  );
}
