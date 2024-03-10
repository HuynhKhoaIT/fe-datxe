"use client";
import React, { useState } from "react";
import { Table, Pagination, Badge } from "@mantine/core";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import TableBasic from "@/app/components/table/Tablebasic";

export default function Orders({ ordersData }: any) {
  const router = useRouter();
  const handleRowClick = (record: any) => {
    router.push(`/dashboard/order/${record.id}`);
  };
  // pagination
  const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedData = ordersData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên chuyên gia
        </span>
      ),
      name: "name",
      dataIndex: ["garage", "name"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Biển số</span>
      ),
      name: "licensePlates",
      dataIndex: ["car", "licensePlates"],
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
      name: "arrivalTime",
      dataIndex: ["arrivalTime"],
      render: (dataRow: Date) => {
        return <span>{dayjs(dataRow).format("DD/MM/YYYY HH:mm")}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tình trạng
        </span>
      ),
      name: "status",
      dataIndex: ["status"],
      render: (dataRow: number) => {
        return (
          <span>
            {dataRow == 1 && (
              <Badge variant="light" color="yellow">
                Tiếp nhận
              </Badge>
            )}
            {dataRow == 2 && (
              <Badge variant="light" color="blue">
                Báo giá
              </Badge>
            )}
            {dataRow == 7 && (
              <Badge variant="light" color="green">
                Hoàn thành
              </Badge>
            )}
          </span>
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tổng đơn hàng
        </span>
      ),
      name: "totalDiscount",
      dataIndex: ["totalDiscount"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
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
                total={Math.ceil(ordersData?.length / itemsPerPage)}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
