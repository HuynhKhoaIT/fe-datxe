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
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import FooterSavePage from "../../_component/FooterSavePage";
import QuillEditor from "@/app/components/elements/RichTextEditor";
import { useAddNews } from "../../hooks/news/useAddNews";
export default function BlogForm({ isEditing, dataDetail }: any) {
  const [valueRTE, setValueRTE] = useState("");
  const { addItem, updateItem } = useAddNews();
  const [loading, handlers] = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };
  const form = useForm({
    initialValues: {
      thumbnail: "",
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
      values.thumbnail = response.data;
    } catch (error) {
      console.error("Error:", error);
    }

    values.slug = convertToSlug(values?.title);
    values.description = valueRTE;
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
                    label="Tên bài viết"
                    type="text"
                    placeholder="Tên bài viết"
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
                  <QuillEditor
                    theme="snow"
                    placeholder="Mô tả chi tiết"
                    className={"quill"}
                    defaultValue={dataDetail?.description || ""}
                    setValue={setValueRTE}
                    value={valueRTE}
                    style={{ height: 600 }}
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
