"use client";
export const revalidate = 0;
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import styles from "./index.module.scss";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import {
  kindProductOptions,
  statusOptions,
  stepOrderOptions,
} from "@/constants/masterData";
import Link from "next/link";
import { IconEye, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import ListPage from "@/app/components/layout/ListPage";
const DynamicModalDeleteProduct = dynamic(
  () => import("../board/ModalDeleteProduct"),
  {
    ssr: false,
  }
);
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Quản lý đơn hàng" },
];
export default function OrdersManaga() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orders, setOrders] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [deleteRow, setDeleteRow] = useState();

  async function getData(searchParams: any, page: number) {
    const res = await fetch(`/api/orders?${searchParams}&page=${page}`, {
      method: "GET",
    });
    const data = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    getData(searchParams.toString(), page);
  }, [searchParams, page]);

  const handleDeleteProduct = async (idProduct: any) => {
    await fetch(`/api/orders/${idProduct}`, {
      method: "DELETE",
    });
    notifications.show({
      title: "Thành công",
      message: "Xoá đơn hàng thành công",
    });
    getData(searchParams, page);
    router.refresh();
  };
  const [
    openedDeleteProduct,
    { open: openDeleteProduct, close: closeDeleteProduct },
  ] = useDisclosure(false);
  const columns = [
    {
      label: <span>Mã đơn hàng</span>,
      name: "fullName",
      dataIndex: ["code"],
      width: "120px",
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span>Tên khách hàng</span>,
      name: "fullName",
      dataIndex: ["customer"],
      render: (dataRow: any) => {
        return <span>{dataRow.fullName}</span>;
      },
    },
    {
      label: <span>số điện thoại</span>,
      name: "phoneNumber",
      dataIndex: ["customer"],
      render: (dataRow: any) => {
        return <span>{dataRow.phoneNumber}</span>;
      },
    },
    {
      label: <span>Biển số xe</span>,
      name: "phoneNumber",
      dataIndex: ["car", "numberPlates"],
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
      label: <span>Tổng tiền</span>,
      name: "total",
      dataIndex: ["total"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span>Tình trạng</span>,
      name: "kind",
      dataIndex: ["step"],
      width: "100px",
      render: (record: any, index: number) => {
        const matchedStatus = stepOrderOptions.find(
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
            <Link
              href={{
                pathname: `/admin/order-manager/${record.id}`,
              }}
            >
              <Tooltip label="Chi tiết" withArrow position="bottom">
                <Button
                  size="xs"
                  style={{ margin: "0 5px" }}
                  variant="transparent"
                  color="gray"
                  p={5}
                  onClick={() => {}}
                >
                  <IconEye size={16} />
                </Button>
              </Tooltip>
            </Link>

            <Tooltip label="Xoá" withArrow position="bottom">
              <Button
                size="xs"
                p={5}
                variant="transparent"
                color="red"
                onClick={(e) => {
                  openDeleteProduct();
                  setDeleteRow(record.id);
                }}
              >
                <IconTrash size={16} color="red" />
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
        // searchForm={
        //   <SearchForm
        //     searchData={searchData}
        //     brandFilter={true}
        //     initialValues={initialValuesSearch}
        //   />
        // }
        actionBar={
          <Flex justify={"end"} align={"center"}>
            <Link
              href={{
                pathname: `/admin/orders-manager/create`,
              }}
            >
              <Button leftSection={<IconPlus size={14} />}>Thêm mới</Button>
            </Link>
          </Flex>
        }
        style={{ height: "100%" }}
        baseTable={
          <TableBasic
            data={orders?.orders}
            columns={columns}
            loading={true}
            totalPage={orders?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
      <DynamicModalDeleteProduct
        openedDeleteProduct={openedDeleteProduct}
        closeDeleteProduct={closeDeleteProduct}
        handleDeleteProduct={handleDeleteProduct}
        deleteRow={deleteRow}
      />
      <FooterAdmin />
    </div>
  );
}
