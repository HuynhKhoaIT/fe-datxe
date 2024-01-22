"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./SellingProduct.module.scss";
import { Badge, Button, Image, Tooltip } from "@mantine/core";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import { kindProductOptions, statusOptions } from "@/constants/masterData";
import Typo from "@/app/components/elements/Typo";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";

export default function SellingProductListPage() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any>();
  const [categoryOptions, setCategoryOptions] = useState<any>([]);

  const [page, setPage] = useState<number>(1);
  async function getData(searchParams: any, page: number) {
    const res = await fetch(
      `/api/products/best-seller?${searchParams}&page=${page}`,
      {
        method: "GET",
      }
    );
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
  ];
  const initialValuesSearch = {
    s: "",
    categoryId: null,
    brandId: null,
    nameId: null,
    yearId: null,
  };

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
  return (
    <div className={styles.wrapper}>
      <Typo size="primary" type="bold" style={{ color: "var(--theme-color)" }}>
        Danh sách sản phẩm bán chạy
      </Typo>
      <ListPage
        style={{ height: "100%" }}
        baseTable={
          <TableBasic
            data={products?.data}
            columns={columns}
            loading={true}
            totalPage={products?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
    </div>
  );
}
