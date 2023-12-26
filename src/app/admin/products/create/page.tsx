// "use client";
// import {
//   Box,
//   Button,
//   Card,
//   Flex,
//   Grid,
//   Group,
//   MultiSelect,
//   NumberInput,
//   Select,
//   Space,
//   Switch,
//   Text,
//   TextInput,
//   Textarea,
// } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import {
//   IconEye,
//   IconPlus,
//   IconBan,
//   IconDownload,
//   IconTrash,
// } from "@tabler/icons-react";
// import Link from "next/link";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { DateTimePicker } from "@mantine/dates";
// import { useEffect, useState } from "react";
// import { BasicDropzone } from "@/app/components/form/DropZone";
// import Typo from "@/app/components/elements/Typo";
// import styles from "../index.module.scss";
// import { getProductDetail } from "@/utils/product";
// import { IProduct } from "@/interfaces/product";
// import InfoCar from "../[slug]/InfoCar";
// import { notifications } from "@mantine/notifications";
// import { useRouter } from "next/navigation";
// const formats = [
//   "header",
//   "font",
//   "size",
//   "color",
//   "background",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "align",
//   "list",
//   "bullet",
//   "indent",
//   "image",
// ];
// export default function ProductCreatePage() {
//   const form = useForm({
//     initialValues: {},
//     validate: {},
//   });
//   const router = useRouter();
//   const [car, setCar] = useState([{ car: "" }]);

//   const handleChange = (index: number, value: any) => {
//     const newCar = [...car];
//     newCar[index].car = value;
//     setCar(newCar);
//   };
//   const handleSubmit = async (values: any) => {
//     try {
//       await fetch(`/api/products`, {
//         method: "POST",
//         body: JSON.stringify(values),
//       });
//       router.push("/admin/products");
//       notifications.show({
//         title: "Thành công",
//         message: "Thêm sản phẩm thành công",
//       });
//     } catch (error) {
//       notifications.show({
//         title: "Thất bại",
//         message: "Thêm sản phẩm thất bại",
//       });
//     }
//   };

//   return (
//     <Box maw={"100%"} mx="auto" className={styles.content}>
//       <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
//         Cập nhật sản phẩm
//       </Typo>
//       <Space h="md" />
//       <form onSubmit={form.onSubmit(handleSubmit)}>
//         <Grid gutter={12}>
//           <Grid.Col span={8}>
//             <Card withBorder shadow="sm">
//               <Grid gutter={10}>
//                 <Grid.Col span={12}>
//                   <TextInput
//                     {...form.getInputProps("name")}
//                     label="Tên sản phẩm"
//                     type="text"
//                     placeholder="Tên sản phẩm"
//                   />
//                 </Grid.Col>
//               </Grid>
//               <Grid gutter={10}>
//                 <Grid.Col span={6}>
//                   <NumberInput
//                     {...form.getInputProps("price")}
//                     label="Giá bán"
//                     min={0}
//                     placeholder="Giá bán"
//                     thousandSeparator=","
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={6}>
//                   <NumberInput
//                     {...form.getInputProps("salePrice")}
//                     min={0}
//                     label="Giá sale"
//                     placeholder="Giá sale"
//                     thousandSeparator=","
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={6}>
//                   <DateTimePicker
//                     label="Thời gian bắt đầu"
//                     placeholder="Thời gian bắt đầu"
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={6}>
//                   <DateTimePicker
//                     label="Thời gian kết thúc"
//                     placeholder="Thời giankết thúc"
//                   />
//                 </Grid.Col>
//               </Grid>
//               <Grid mt={24}>
//                 <Grid.Col span={12}>
//                   <>
//                     <Text size={"14px"} c={"#999999"} mb={"6px"}>
//                       Mô tả chi tiết
//                     </Text>
//                     <ReactQuill
//                       theme="snow"
//                       style={{ height: "400px" }}
//                       formats={formats}
//                       {...form.getInputProps("metaDescription")}
//                     />
//                   </>
//                 </Grid.Col>
//               </Grid>
//               <Grid mt={24}>
//                 <Grid.Col span={12}>
//                   <Textarea
//                     label="Mô tả ngắn"
//                     minRows={4}
//                     autosize={true}
//                     {...form.getInputProps("description")}
//                     placeholder="Mô tả ngắn"
//                   />
//                 </Grid.Col>
//               </Grid>
//               <InfoCar carData={car} setCar={setCar} />
//             </Card>
//           </Grid.Col>
//           <Grid.Col span={4}>
//             <Card withBorder shadow="sm">
//               <Grid>
//                 <Grid.Col span={12}>
//                   <Select
//                     {...form.getInputProps("category")}
//                     label="Danh mục"
//                     checkIconPosition="right"
//                     placeholder="Danh mục"
//                   />
//                 </Grid.Col>
//               </Grid>
//               <Grid>
//                 <Grid.Col span={12}>
//                   <Select
//                     {...form.getInputProps("category")}
//                     label="Loại hình sản phẩm"
//                     checkIconPosition="right"
//                     placeholder="Loại hình sản phẩm"
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={12}>
//                   <BasicDropzone />
//                 </Grid.Col>
//                 <Grid.Col span={12}>
//                   <Switch onLabel="ON" offLabel="OFF" label="Quản lý kho" />
//                 </Grid.Col>
//               </Grid>
//               <Grid gutter={10}>
//                 <Grid.Col span={6}>
//                   <NumberInput
//                     label="Số lượng"
//                     min={0}
//                     placeholder="Số lượng"
//                     thousandSeparator=","
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={6}>
//                   <NumberInput
//                     min={0}
//                     label="Số lượng cảnh báo"
//                     placeholder="Số lượng cảnh báo"
//                     thousandSeparator=","
//                     {...form.getInputProps("priceSale")}
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={12}>
//                   <Switch onLabel="ON" offLabel="OFF" label="Công khai" />
//                 </Grid.Col>
//               </Grid>
//             </Card>
//           </Grid.Col>
//         </Grid>

//         <Group justify="end" style={{ marginTop: 60 }}>
//           <Link href={"/admin/products"}>
//             <Button
//               variant="outline"
//               key="cancel"
//               color="red"
//               leftSection={<IconBan size={16} />}
//             >
//               Huỷ bỏ
//             </Button>
//           </Link>
//           <Button
//             style={{ marginLeft: "12px" }}
//             key="submit"
//             type="submit"
//             variant="filled"
//             leftSection={<IconPlus size={16} />}
//           >
//             Thêm
//           </Button>
//         </Group>
//       </form>
//     </Box>
//   );
// }
import React from "react";
export default async function ProductCreate() {
  return <h2>create</h2>;
}
