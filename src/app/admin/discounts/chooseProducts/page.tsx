"use client";
export const revalidate = 0;
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import styles from "./index.module.scss";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge, Button, Image, Tooltip } from "@mantine/core";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import { kindProductOptions, statusOptions } from "@/constants/masterData";
import ListPage from "../../products/ListPage";

export default function ProductsManaga() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<any>();
  const [categoryOptions, setCategoryOptions] = useState<any>([]);

  const [page, setPage] = useState<number>(1);

  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Sản phẩm" },
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
      label: <span>Số lượng</span>,
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
    },
    {
      label: <span>Giá bán</span>,
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
      label: <span>Trạng thái</span>,
      name: "status",
      dataIndex: ["status"],
      width: "100px",
      render: (record: any) => {
        const matchedStatus = statusOptions.find(
          (item) => item.value === record
        );
        if (matchedStatus) {
          return (
            <Badge color={matchedStatus.color} key={record}>
              {matchedStatus.label}
            </Badge>
          );
        }
      },
    },
  ];
  const searchData = [
    {
      name: "s",
      placeholder: "Tên sản phẩm",
      type: "input",
    },
    {
      name: "categoryId",
      placeholder: "Danh mục",
      type: "select",
      data: categoryOptions,
    },
    {
      name: "isProduct",
      placeholder: "Loại",
      type: "select",
      data: kindProductOptions,
    },
  ];
  const initialValuesSearch = {
    s: "",
    categoryId: null,
    brandId: null,
    nameId: null,
    yearId: null,
  };
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <ListPage
        dataSource={products}
        setPage={setPage}
        activePage={page}
        columns={columns}
        searchData={searchData}
        initialValuesSearch={initialValuesSearch}
        brandFilter={true}
        isCreate={true}
      />
      <FooterAdmin />
    </div>
  );
}
