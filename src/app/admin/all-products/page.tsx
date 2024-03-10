"use client";
import { getProductByGar } from "@/utils/product";
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import { Button, Image, Tooltip } from "@mantine/core";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import { IconPlayerTrackNext } from "@tabler/icons-react";
import ListPage from "@/app/components/layout/ListPage";

export default function ProductsManaga() {
  const searchParams = useSearchParams();
  const router = useRouter();

  let garage_id: string = "9";
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<any>();

  async function getData(searchParams: any, page: number) {
    const res = await getProductByGar(
      searchParams,
      garage_id.toString(),
      10,
      page
    );
    setProducts(res);
  }
  useEffect(() => {
    getData(searchParams.toString(), page);
  }, [searchParams, page]);
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Sản phẩm trong kho" },
  ];
  const columns = [
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Hình ảnh</span>,
      name: "image",
      dataIndex: ["thumbnail"],
      width: "120px",
      render: (data: any) => {
        if (!data) {
          return (
            <Image
              radius="md"
              src={ImageDefult.src}
              h={40}
              w={60}
              fit="contain"
            />
          );
        }
        return <Image h={40} radius="md" w={80} fit="contain" src={data} />;
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Tên sản phẩm</span>,
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Giá bán</span>,
      name: "price",
      dataIndex: ["price"],
      width: "150px",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Giá sale</span>,
      name: "priceSale",
      dataIndex: ["entryPrice"],
      width: "150px",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Hành động</span>,
      dataIndex: [],
      width: "120px",
      textAlign: "center",
      render: (record: any) => {
        return (
          <>
            <Tooltip label="Lên sàn" withArrow position="bottom">
              <Button
                size="md"
                p={5}
                variant="transparent"
                color="red"
                onClick={(e) => {
                  router.push(
                    `/admin/products/direction?productId=${record.id}`
                  );
                }}
              >
                <IconPlayerTrackNext size={16} color="blue" />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const searchData = [
    {
      name: "s",
      placeholder: "Tên sản phẩm",
      type: "input",
    },
  ];
  const initialValuesSearch = {
    s: "",
  };
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <ListPage
        searchForm={
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
        }
        style={{ height: "100%" }}
        baseTable={
          <TableBasic
            data={products?.data}
            columns={columns}
            loading={true}
            totalPage={products?.meta?.last_page}
            setPage={setPage}
            activePage={page}
          />
        }
      />
    </Fragment>
  );
}
