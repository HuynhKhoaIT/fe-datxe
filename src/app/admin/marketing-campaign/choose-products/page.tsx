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
  Image,
  TextInput,
  Tooltip,
} from "@mantine/core";
import ImageDefult from "../../../../../public/assets/images/logoDatxe.png";
import { kindProductOptions, statusOptions } from "@/constants/masterData";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import Link from "next/link";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import Typo from "@/app/components/elements/Typo";
import DateField from "@/app/components/form/DateField";
import { useForm } from "@mantine/form";
const DynamicModalChooseProducts = dynamic(
  () => import("./ModalChooseProducts"),
  {
    ssr: false,
  }
);
export default function ProductsManaga() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<any>();
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const [categoryOptions, setCategoryOptions] = useState<any>([]);

  const [page, setPage] = useState<number>(1);

  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách chương trình", href: "/admin/marketing-campaign" },
    { title: "Thêm chương trình" },
  ];
  async function getData(searchParams: any, page: number) {
    const res = await fetch(`/api/products?${searchParams}&page=${page}`, {
      method: "GET",
    });
    const data = await res.json();
    setProducts(data);
  }
  async function getDataCategories() {
    const res = await fetch(`/api/product-category`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setCategoryOptions(dataOption);
  }
  useEffect(() => {
    getData(searchParams.toString(), page);
    getDataCategories();
  }, [searchParams, page]);

  const columns = [
    {
      label: <span>Hình ảnh</span>,
      name: "image",
      dataIndex: ["images"],
      width: "90px",
      render: (data: any) => {
        const images = JSON.parse(data);
        if (!images) {
          return (
            <Image
              radius="md"
              src={ImageDefult.src}
              h={40}
              w="auto"
              fit="contain"
            />
          );
        }
        return (
          <Image radius="md " h={40} w={80} fit="contain" src={images[0]} />
        );
      },
    },
    {
      label: <span>Tên sản phẩm</span>,
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },

    {
      label: <span>Giá gốc</span>,
      name: "price",
      dataIndex: ["price"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span>Giá sale</span>,
      name: "priceSale",
      dataIndex: ["salePrice"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span>Số lượng khuyến mãi</span>,
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
    },
    {
      label: <span>Loại</span>,
      name: "kind",
      dataIndex: ["isProduct"],
      width: "100px",
      render: (record: any, index: number) => {
        const matchedStatus = kindProductOptions.find(
          (item) => item.value === record.toString()
        );
        if (matchedStatus) {
          return (
            <Badge color={matchedStatus.color} key={index}>
              {matchedStatus.label}
            </Badge>
          );
        }
      },
    },
    {
      label: <span>Hành động</span>,
      dataIndex: [],
      width: "100px",
      render: (record: any) => {
        return (
          <>
            <Tooltip label="Xoá" withArrow position="bottom">
              <Button
                size="xs"
                p={5}
                variant="transparent"
                color="red"
                // onClick={(e) => {
                //   openDeleteProduct();
                //   setDeleteRow(record.id);
                // }}
              >
                <IconTrash size={16} color="red" />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const [
    openModalChoose,
    { open: openModal, close: closeModal },
  ] = useDisclosure(false);

  const form = useForm({
    initialValues: {},
    validate: {},
  });
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <form className={styles.form}>
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
              <DateField
                label="Ngày bắt đầu"
                required
                {...form.getInputProps("dateTimeStart")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <DateField
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
                <TableBasic
                  data={selectedRows}
                  columns={columns}
                  loading={true}
                  totalPage={Math.ceil(selectedRows.length / 10)}
                  setPage={setPage}
                  activePage={page}
                />
              }
            />
          </Grid.Col>
        </Grid>
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
