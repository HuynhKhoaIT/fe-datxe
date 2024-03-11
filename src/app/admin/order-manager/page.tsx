"use client";
export const revalidate = 0;
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import { stepOrderOptions } from "@/constants/masterData";
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
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Mã đơn hàng
        </span>
      ),
      name: "fullName",
      dataIndex: ["code"],
      width: "120px",
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên khách hàng
        </span>
      ),
      name: "fullName",
      dataIndex: ["customer"],
      render: (dataRow: any) => {
        return <span>{dataRow.fullName}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Số điện thoại
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["customer"],
      render: (dataRow: any) => {
        return <span>{dataRow.phoneNumber}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Biển số xe
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["car", "numberPlates"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tổng đơn hàng
        </span>
      ),
      name: "total",
      dataIndex: ["total"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tình trạng
        </span>
      ),
      name: "kind",
      dataIndex: ["step"],
      width: "100px",
      render: (record: any, index: number) => {
        const matchedStatus = stepOrderOptions.find(
          (item) => item.value === record.toString()
        );
        if (matchedStatus) {
          return (
            <Badge
              radius={0}
              size="lg"
              variant="light"
              color={matchedStatus.color}
              key={index}
            >
              {matchedStatus.label}
            </Badge>
          );
        }
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
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
                  size="lg"
                  radius={0}
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
                size="lg"
                radius={0}
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
      name: "code",
      placeholder: "Mã đơn hàng",
      type: "input",
    },
    {
      name: "step",
      placeholder: "Tình trạng",
      type: "select",
      data: stepOrderOptions,
    },
  ];
  const initialValuesSearch = {
    code: "",
    step: null,
    brandId: null,
    nameId: null,
    yearId: null,
  };
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <ListPage
        searchForm={
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
        }
        actionBar={
          <Flex justify={"end"} align={"center"}>
            <Link
              href={{
                pathname: `/admin/order-manager/create`,
              }}
            >
              <Button size="lg" radius={0} leftSection={<IconPlus size={18} />}>
                Thêm mới
              </Button>
            </Link>
          </Flex>
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableBasic
            data={orders?.data}
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
    </Fragment>
  );
}
