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
  kindMarketingOptions,
  kindProductOptions,
  statusOptions,
} from "@/constants/masterData";
import Link from "next/link";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import dayjs from "dayjs";
const DynamicModalDelete = dynamic(
  () => import("../board/ModalDeleteProduct"),
  {
    ssr: false,
  }
);
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách chương trình" },
];
export default function Discounts() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [marketing, setMarketing] = useState<any>();
  const [page, setPage] = useState<number>(1);
  async function getData(searchParams: any, page: number) {
    const res = await fetch(
      `/api/marketing-campaign?${searchParams}&page=${page}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    setMarketing(data);
  }

  useEffect(() => {
    getData(searchParams.toString(), page);
  }, [searchParams, page]);

  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteMarketing = async (marketingId: any) => {
    await fetch(`/api/marketing-campaign/${marketingId}`, {
      method: "DELETE",
    });
    notifications.show({
      title: "Thành công",
      message: "Xoá chương trình thành công",
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
      label: <span>Tên chương trình</span>,
      name: "title",
      dataIndex: ["title"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span>Sản phẩm</span>,
      name: "detail",
      dataIndex: ["detail"],
      textAlign: "center",
      render: (dataRow: any) => {
        return <span>{dataRow ? dataRow?.length : 0} Sản phẩm</span>;
      },
    },
    {
      label: <span>Thời gian bắt đầu</span>,
      name: "dateTimeStart",
      dataIndex: ["dateTimeStart"],
      render: (dataRow: number) => {
        return (
          <span>
            {dataRow ? dayjs(dataRow).format("DD-MM-YYYY HH:MM") : null}
          </span>
        );
      },
    },
    {
      label: <span>Thời gian kết thúc</span>,
      name: "dateTimeEnd",
      dataIndex: ["dateTimeEnd"],
      render: (dataRow: number) => {
        return (
          <span>
            {dataRow ? dayjs(dataRow).format("DD-MM-YYYY HH:MM") : null}
          </span>
        );
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
    {
      label: <span>Hành động</span>,
      dataIndex: [],
      width: "100px",
      render: (record: any) => {
        return (
          <>
            <Link
              href={{
                pathname: `/admin/marketing-campaign/${record.id}`,
              }}
            >
              <Tooltip label="Cập nhật" withArrow position="bottom">
                <Button
                  size="xs"
                  style={{ margin: "0 5px" }}
                  variant="transparent"
                  color="gray"
                  p={5}
                  onClick={() => {}}
                >
                  <IconPencil size={16} />
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
      placeholder: "Tên chương trình",
      type: "input",
    },
    {
      name: "state",
      placeholder: "Tình trạng",
      type: "select",
      data: kindMarketingOptions,
    },
  ];
  const initialValuesSearch = {
    s: "",
    state: null,
  };
  return (
    <div className={styles.wrapper}>
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
                pathname: `/admin/marketing-campaign/choose-products`,
              }}
            >
              <Button leftSection={<IconPlus size={14} />}>Thêm mới</Button>
            </Link>
          </Flex>
        }
        style={{ height: "100%" }}
        baseTable={
          <TableBasic
            data={marketing?.data}
            columns={columns}
            loading={true}
            totalPage={marketing?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
      <DynamicModalDelete
        openedDeleteProduct={openedDeleteProduct}
        closeDeleteProduct={closeDeleteProduct}
        handleDeleteProduct={handleDeleteMarketing}
        deleteRow={deleteRow}
      />
      <FooterAdmin />
    </div>
  );
}
