"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  Pagination,
  Tabs,
  Image,
  Tooltip,
  Space,
} from "@mantine/core";
import {
  IconBan,
  IconChevronRight,
  IconEye,
  IconPencil,
  IconTrash,
  IconPlayerTrackNext,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import Typo from "@/app/components/elements/Typo";
import { notifications } from "@mantine/notifications";
import TableBasic from "@/app/components/table/Tablebasic";
export const revalidate = 0;
import { useRouter } from "next/navigation";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import PaginationBase from "@/app/components/form/PaginationBase";
import SearchForm from "@/app/components/form/SearchForm";
export default function ProductListPage({
  productsGara,
  setPage,
  activePage,
}: any) {
  const router = useRouter();
  const columnsGara = [
    {
      label: <span>Hình ảnh</span>,
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
      label: <span>Tên sản phẩm</span>,
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span>Giá bán</span>,
      name: "price",
      dataIndex: ["price"],
      width: "150px",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span>Giá sale</span>,
      name: "priceSale",
      dataIndex: ["entryPrice"],
      width: "150px",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span>Hành động</span>,
      dataIndex: [],
      width: "120px",
      textAlign: "center",
      render: (record: any) => {
        return (
          <>
            <Tooltip label="Lên sàn" withArrow position="bottom">
              <Button
                size="xs"
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
    <div className={styles.listPage}>
      <SearchForm searchData={searchData} initialValues={initialValuesSearch} />
      <TableBasic data={productsGara} columns={columnsGara} />
      <PaginationBase activePage={activePage} setPage={setPage} />
    </div>
  );
}
