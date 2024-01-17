"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import { Badge, Button, Flex, Image } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { statusOptions } from "@/constants/masterData";
import SearchForm from "@/app/components/form/SearchForm";
const DynamicModalDeleteProduct = dynamic(
  () => import("../board/ModalDeleteProduct"),
  {
    ssr: false,
  }
);
export default function CarsListPage({ dataSource }: any) {
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteCategory = async (id: any) => {
    await fetch(`/api/product-category/${id}`, {
      method: "DELETE",
    });
    notifications.show({
      title: "Thành công",
      message: "Xoá danh mục thành công",
    });
  };
  const [
    openedDeleteProduct,
    { open: openDeleteProduct, close: closeDeleteProduct },
  ] = useDisclosure(false);
  const columns = [
    {
      label: <span>Biển số xe</span>,
      name: "title",
      dataIndex: ["numberPlates"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span>Màu xe</span>,
      name: "color",
      dataIndex: ["color"],
    },
    {
      label: <span>Hãng xe</span>,
      name: "carBrandId",
      dataIndex: ["carBrandId"],
    },
    {
      label: <span>Dòng xe</span>,
      name: "carNameId",
      dataIndex: ["carNameId"],
    },
    {
      label: <span>Năm sản xuất</span>,
      name: "carYearId",
      dataIndex: ["carYearId"],
    },
    {
      label: <span>Loại xe</span>,
      name: "carYearId",
      dataIndex: ["carYearId"],
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
                pathname: `/admin/categories/${record.id}`,
              }}
            >
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
            </Link>

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
          </>
        );
      },
    },
  ];

  const searchData = [
    {
      name: "s",
      placeholder: "Tên danh mục",
      type: "input",
    },
    {
      name: "status",
      placeholder: "Trạng thái",
      type: "select",
      data: statusOptions,
    },
  ];
  const initialValuesSearch = {
    s: "",
    status: null,
  };
  return (
    <div className={styles.content}>
      <SearchForm searchData={searchData} initialValues={initialValuesSearch} />
      <Flex justify={"end"} align={"center"}>
        <Link
          href={{
            pathname: `/admin/categories/create`,
          }}
        >
          <Button leftSection={<IconPlus size={14} />}>Thêm mới</Button>
        </Link>
      </Flex>
      <div className="row">
        <div className="col-12">
          <TableBasic data={dataSource} columns={columns} />
        </div>
      </div>
      <DynamicModalDeleteProduct
        openedDeleteProduct={openedDeleteProduct}
        closeDeleteProduct={closeDeleteProduct}
        handleDeleteProduct={handleDeleteCategory}
        deleteRow={deleteRow}
      />
    </div>
  );
}
