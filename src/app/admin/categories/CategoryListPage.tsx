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
const DynamicModalCategories = dynamic(() => import("./ModalCategoriesDLBD"));
export default function CategoryListPage({ dataSource, profile }: any) {
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

  const [
    openedModalCategories,
    { open: openModalCategories, close: closeModalCategories },
  ] = useDisclosure(false);

  const columns = [
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Hình ảnh</span>,
      name: "image",
      dataIndex: ["image"],
      width: "90px",
      render: (data: any) => {
        if (!data) {
          return (
            <Image
              radius="md"
              src={ImageDefult.src}
              h={40}
              w="auto"
              fit="contain"
            />
          );
        }
        return <Image radius="md " h={40} w={80} fit="contain" src={data} />;
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Tên</span>,
      name: "title",
      dataIndex: ["title"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Trạng thái</span>,
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
      label: <span style={{ whiteSpace: "nowrap" }}>Hành động</span>,
      dataIndex: [],
      width: "100px",
      render: (record: any) => {
        return (
          <Flex>
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
          </Flex>
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
      <Flex justify={"end"} align={"center"} gap={20}>
        <Button
          onClick={openModalCategories}
          leftSection={<IconPlus size={14} />}
        >
          Đồng bộ
        </Button>
        <Link
          href={{
            pathname: `/admin/categories/create`,
          }}
        >
          <Button leftSection={<IconPlus size={14} />}>Thêm mới</Button>
        </Link>
      </Flex>
      <TableBasic data={dataSource} columns={columns} />
      <DynamicModalDeleteProduct
        openedDeleteProduct={openedDeleteProduct}
        closeDeleteProduct={closeDeleteProduct}
        handleDeleteProduct={handleDeleteCategory}
        deleteRow={deleteRow}
      />
      {openedModalCategories && (
        <DynamicModalCategories
          openedModalCategories={openedModalCategories}
          closeModalCategories={closeModalCategories}
          profile={profile}
        />
      )}
    </div>
  );
}
