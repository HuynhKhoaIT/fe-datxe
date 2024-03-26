"use client";
export const revalidate = 0;
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
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
import { QueryClient } from "@tanstack/react-query";
import useFetch from "@/app/hooks/useFetch";
import { getMarketing } from "./until";
import axios from "axios";
const DynamicModalDeleteItem = dynamic(
  () => import("../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
const queryClient = new QueryClient();
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách chương trình" },
];
export default function Discounts() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useState<number>(1);

  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const {
    data: marketing,
    isLoading,
    error,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useFetch({
    queryKey: ["marketing", page],
    queryFn: () => getMarketing(searchParams.toString(), page),
  });

  useEffect(() => {
    if (!isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ["marketing", page],
        queryFn: () => getMarketing(searchParams.toString(), page),
        staleTime: Infinity,
      });
    }
  }, [marketing, searchParams, isPlaceholderData, page, queryClient]);

  const [deleteRow, setDeleteRow] = useState();

  const handleDeleteItem = async (marketingId: any) => {
    try {
      await axios.delete(`/api/marketing-campaign/${marketingId}`);
      notifications.show({
        title: "Thành công",
        message: "Xoá chương trình thành công",
      });
      refetch();
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên chương trình
        </span>
      ),
      name: "title",
      dataIndex: ["title"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Sản phẩm</span>
      ),
      name: "detail",
      dataIndex: ["detail"],
      textAlign: "center",
      render: (dataRow: any) => {
        return <span>{dataRow ? dataRow?.length : 0} Sản phẩm</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Thời gian bắt đầu
        </span>
      ),
      name: "dateTimeStart",
      dataIndex: ["dateTimeStart"],
      width: "200px",
      render: (dataRow: number) => {
        return (
          <span>
            {dataRow ? dayjs(dataRow).format("DD-MM-YYYY HH:MM") : null}
          </span>
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Thời gian kết thúc
        </span>
      ),
      name: "dateTimeEnd",
      dataIndex: ["dateTimeEnd"],
      width: "200px",
      render: (dataRow: number) => {
        return (
          <span>
            {dataRow ? dayjs(dataRow).format("DD-MM-YYYY HH:MM") : null}
          </span>
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Trạng thái
        </span>
      ),
      name: "status",
      dataIndex: ["status"],
      width: "100px",
      render: (record: any) => {
        const matchedStatus = statusOptions.find(
          (item) => item.value === record
        );
        if (matchedStatus) {
          return (
            <Badge
              variant="light"
              radius={0}
              size="lg"
              color={matchedStatus.color}
              key={record}
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
                pathname: `/admin/marketing-campaign/${record.id}`,
              }}
            >
              <Tooltip label="Cập nhật" withArrow position="bottom">
                <Button
                  size="lg"
                  radius={0}
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
                pathname: `/admin/marketing-campaign/choose-products`,
              }}
            >
              <Button
                size="lg"
                h={{ base: 42, md: 50, lg: 50 }}
                radius={0}
                leftSection={<IconPlus size={18} />}
              >
                Thêm mới
              </Button>
            </Link>
          </Flex>
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableBasic
            data={marketing?.data}
            columns={columns}
            loading={isLoading}
            totalPage={marketing?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
        deleteRow={deleteRow}
      />
    </Fragment>
  );
}
