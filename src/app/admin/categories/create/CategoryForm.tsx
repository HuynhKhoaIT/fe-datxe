"use client";
import {
  Box,
  Card,
  FileButton,
  Grid,
  Text,
  TextInput,
  Textarea,
  Image,
  Select,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import FooterSavePage from "../../_component/FooterSavePage";
import convertToSlug from "@/utils/until";
import { useAddCategory } from "../../hooks/category/useAddCategory";
export default function CategoryForm({ isEditing, dataDetail }: any) {
  const { addItem, updateItem } = useAddCategory();
  const [loading, handlers] = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  console.log(file);
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
      // title: (value) => (value.length < 1 ? "Không được để trống" : null),
      // image: (value) => (value.length < 1 ? "Không được để trống" : null),
    },
  });

  useEffect(() => {
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

    if (isEditing) {
      handlers.open();
      fetchData();
    }
  }, [dataDetail]);

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
    if (isEditing) {
      updateItem(values);
    } else {
      addItem(values);
    }
    handlers.close();
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
                <Grid.Col span={8}>
                  <TextInput
                    size="lg"
                    radius={0}
                    {...form.getInputProps("title")}
                    label="Tên danh mục"
                    type="text"
                    placeholder="Tên danh mục"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
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
              <Grid mt={24}>
                <Grid.Col span={12}>
                  <Textarea
                    size="lg"
                    radius={0}
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

        <FooterSavePage
          saveLoading={loading}
          okText={isEditing ? "Cập nhật" : "Thêm"}
        />
      </form>
    </Box>
  );
}
