"use client";
export const revalidate = 0;
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import styles from "./index.module.scss";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  NumberInput,
  Table,
  TextInput,
  Tooltip,
} from "@mantine/core";
import ImageDefult from "../../../../../public/assets/images/logoDatxe.png";
import { kindProductOptions, statusOptions } from "@/constants/masterData";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import Link from "next/link";
import { IconBan, IconPlus, IconTrash } from "@tabler/icons-react";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import Typo from "@/app/components/elements/Typo";
import DateField from "@/app/components/form/DateField";
import { useForm } from "@mantine/form";
import DateTimeField from "@/app/components/form/DateTimeField";
const DynamicModalChooseProducts = dynamic(
  () => import("./ModalChooseProducts"),
  {
    ssr: false,
  }
);
export default function ChooseProducts({ isEditing, dataDetail }: any) {
  const searchParams = useSearchParams();
  const [loading, handlers] = useDisclosure();
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const router = useRouter();
  const form = useForm({
    initialValues: {
      detail: selectedRows,
    },
    validate: {},
  });
  useEffect(() => {
    form.setFieldValue("detail", selectedRows);
  }, [selectedRows]);
  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách chương trình", href: "/admin/marketing-campaign" },
    { title: "Thêm chương trình" },
  ];

  const [
    openModalChoose,
    { open: openModal, close: closeModal },
  ] = useDisclosure(false);

  const rows = form.values.detail.map((selectedRow: any, index: number) => {
    // const images = JSON.parse(selectedRow.images);
    return (
      <Table.Tr key={selectedRow.id}>
        {/* <Table.Td>
          {images ? (
            <Image radius="md" src={images[0]} h={40} w="auto" fit="contain" />
          ) : (
            <Image
              radius="md"
              src={ImageDefult.src}
              h={40}
              w="auto"
              fit="contain"
            />
          )}
        </Table.Td> */}
        <Table.Td>{selectedRow.name}</Table.Td>
        <Table.Td>{selectedRow.price}</Table.Td>
        <Table.Td>
          <NumberInput
            {...form.getInputProps(`detail.${index}.priceSale`)}
            // label="Giá sale"
            min={0}
            placeholder="Giá sale"
            thousandSeparator=","
          />
        </Table.Td>
        <Table.Td>
          <NumberInput
            {...form.getInputProps(`detail.${index}.quantity`)}
            min={0}
            placeholder="Số lượng"
            thousandSeparator=","
          />
        </Table.Td>
        {/* <Table.Td>
          {selectedRow?.isProduct ? (
            <Badge color="green">Sản phẩm</Badge>
          ) : (
            <Badge color="blue">Dịch vụ</Badge>
          )}
        </Table.Td> */}
        <Table.Td>
          <>
            <Tooltip label="Xoá" withArrow position="bottom">
              <Button
                size="xs"
                p={5}
                variant="transparent"
                color="red"
                onClick={(e) => {
                  setSelectedRows(
                    selectedRows.filter(
                      (selectedItem: any) =>
                        selectedItem?.productId !== selectedRow.productId
                    )
                  );
                }}
              >
                <IconTrash size={16} color="red" />
              </Button>
            </Tooltip>
          </>
        </Table.Td>
      </Table.Tr>
    );
  });

  const handleSubmit = async (values: any) => {
    handlers.open();

    const modifiedObject = {
      price: values.detail.price,
      productId: values.detail.id,
      quantity: values.detail.quantity,
      priceSale: values.detail.priceSale,
      subTotal: 1,
      status: "PUBLIC",
      saleType: "FIXED",
      salevalue: 0,
    };
    let updatedProducts = values.detail.map((detail: any) => ({
      price: detail.price,
      productId: detail.id,
      quantity: detail.quantity,
      priceSale: detail.priceSale,
      subTotal: 1,
      status: "PUBLIC",
      saleType: "FIXED",
      salevalue: 0,
    }));
    values.detail = updatedProducts;
    try {
      const url = isEditing
        ? `/api/marketing-campaign/${dataDetail?.id}`
        : `/api/marketing-campaign`;
      await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: JSON.stringify(values),
      });
    } catch (error) {
    } finally {
      handlers.close();
      router.push("/admin/marketing-campaign");
    }
  };
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <form className={styles.form} onSubmit={form.onSubmit(handleSubmit)}>
        <div>
          {/* <Typo>Chuơng trình</Typo> */}
          <Grid gutter={16}>
            <Grid.Col span={6}>
              <TextInput
                label="Tên chương trình"
                type="text"
                placeholder="Tên chương trình"
                {...form.getInputProps("title")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <DateTimeField
                label="Ngày bắt đầu"
                required
                {...form.getInputProps("dateTimeStart")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <DateTimeField
                label="Ngày kết thúc"
                required
                {...form.getInputProps("dateTimeEnd")}
              />
            </Grid.Col>
          </Grid>
        </div>
        <Grid mt={24}>
          <Grid.Col span={12}>
            <ListPage
              title="Danh sách sản phẩm khuyến mãi"
              style={{ height: "100%" }}
              actionBar={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={(e) => {
                      openModal();
                    }}
                    leftSection={<IconPlus size={14} />}
                  >
                    Thêm sản phẩm
                  </Button>
                </div>
              }
              baseTable={
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      {/* <Table.Th>Hình ảnh</Table.Th> */}
                      <Table.Th>Tên sản phẩm</Table.Th>
                      <Table.Th>Giá gốc</Table.Th>
                      <Table.Th>Giá sale</Table.Th>
                      <Table.Th>Số lượng khuyến mãi</Table.Th>
                      {/* <Table.Th>Loại</Table.Th> */}
                      <Table.Th>hành động</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              }
            />
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
            Xác nhận
          </Button>
        </Group>
      </form>

      <DynamicModalChooseProducts
        openModal={openModalChoose}
        close={closeModal}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
      />
      <FooterAdmin />
    </div>
  );
}
