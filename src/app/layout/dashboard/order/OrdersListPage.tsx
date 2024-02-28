"use client";
import React, { useState } from "react";
import { Table, Pagination, Badge, Tooltip, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import TableBasic from "@/app/components/table/Tablebasic";
import { stepOrderOptions } from "@/constants/masterData";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";

export default function OrdersListPage({ dataSource }: any) {
  console.log(dataSource);
  const router = useRouter();
  const handleRowClick = (record: any) => {
    router.push(`/dashboard/order/${record.id}`);
  };
  // pagination
  const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedData = dataSource?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };
  const columns = [
    {
      label: <span>Biển số</span>,
      name: "licensePlates",
      dataIndex: ["car", "numberPlates"],
    },
    {
      label: <span>Mã đơn hàng</span>,
      name: "code",
      dataIndex: ["code"],
    },
    {
      label: <span>Ngày sửa</span>,
      name: "arrivalTime",
      dataIndex: ["arrivalTime"],
      render: (dataRow: Date) => {
        return <span>{dayjs(dataRow).format("DD/MM/YYYY HH:mm")}</span>;
      },
    },
    {
      label: <span>Tổng đơn hàng</span>,
      name: "total",
      dataIndex: ["total"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
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
                pathname: `/dashboard/order/${record.id}`,
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
          </>
        );
      },
    },
  ];

  return (
    <div className="user-profile-wrapper">
      <div className="row">
        <div className="col-lg-12">
          <div className="user-profile-card">
            <div className="user-profile-card-header">
              <h4 className="user-profile-card-title">Danh sách đơn hàng</h4>
            </div>
            <div className="table-responsive" style={{ overflowY: "hidden" }}>
              <TableBasic columns={columns} data={paginatedData} />
              <Pagination
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "end",
                }}
                total={Math.ceil(dataSource?.length / itemsPerPage)}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
