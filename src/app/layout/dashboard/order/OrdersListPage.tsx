"use client";
import React, { useState } from "react";
import { Table, Pagination, Badge, Tooltip, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import TableBasic from "@/app/components/table/Tablebasic";
import { stepOrderOptions } from "@/constants/masterData";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
export default function OrdersListPage({ dataSource }: any) {
  console.log(dataSource);
  // pagination
  const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedData = dataSource?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Biển số</span>
      ),
      name: "licensePlates",
      dataIndex: ["car", "numberPlates"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Mã đơn hàng
        </span>
      ),
      name: "code",
      dataIndex: ["code"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Ngày sửa</span>
      ),
      name: "dateTime",
      dataIndex: ["dateTime"],
      render: (dataRow: Date) => {
        return <span>{dayjs(dataRow).format("DD/MM/YYYY HH:mm")}</span>;
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
                pathname: `/dashboard/order/${record.slug}`,
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
          </>
        );
      },
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div style={{ borderBottom: "1px solid #eeeeee" }}>
        <Typo size="18px" type="bold" className={styles.title}>
          Đơn hàng của tôi
        </Typo>
      </div>
      <TableBasic
        className={styles.table}
        columns={columns}
        data={paginatedData}
      />
    </div>
  );
}
