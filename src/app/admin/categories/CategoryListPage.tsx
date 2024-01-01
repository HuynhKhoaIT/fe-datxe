"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";

import {
  Box,
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  Pagination,
} from "@mantine/core";
import {
  IconBan,
  IconChevronRight,
  IconEye,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { deleteCar } from "@/utils/car";
import Typo from "@/app/components/elements/Typo";
import { notifications } from "@mantine/notifications";
import TableBasic from "@/app/components/table/Tablebasic";
export default function CategoryListPage({ dataSource }: any) {
  const [categories, setCategories] = useState([]);
  const [deleteRow, setDeleteRow] = useState();
  const [visible, handlers] = useDisclosure(false);
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
  const [totalPage, setTotalPage] = useState(0);

  const columns = [
    {
      label: <span>Hình ảnh</span>,
      name: "image",
      dataIndex: ["image"],
      width: "20%",
      render: (data: any) => {
        return <span>khoa</span>;
      },
    },
    {
      label: <span>Tên</span>,
      name: "title",
      dataIndex: ["title"],
      width: "30%",
      render: (dataRow: any) => {
        return <h5>{dataRow}</h5>;
      },
    },
    {
      label: <span>Mô tả</span>,
      name: "description",
      dataIndex: ["description"],
      width: "15%%",
    },
    {
      label: <span>Hành động</span>,
      dataIndex: [],
      width: "20%",
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
  return (
    <div className={styles.content}>
      <Flex justify={"space-between"} align={"center"}>
        <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
          Tất cả danh mục sản phẩm
        </Typo>
        <Link
          href={{
            pathname: `/admin/categories/create`,
          }}
        >
          <Button>Thêm danh mục</Button>
        </Link>
      </Flex>
      <div className="row">
        <div className="col-12">
          <TableBasic data={dataSource} columns={columns} />
          <Pagination
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "end",
            }}
            total={totalPage}
            // onChange={())}
          />
        </div>
      </div>
      <Modal
        title="Xoá danh mục"
        opened={openedDeleteProduct}
        onClose={closeDeleteProduct}
        lockScroll={false}
      >
        <div>Bạn có muốn xoá không?</div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            variant="filled"
            key="cancel"
            onClick={closeDeleteProduct}
            color="red"
            leftSection={<IconBan />}
          >
            Huỷ bỏ
          </Button>
          <Button
            style={{ marginLeft: "12px" }}
            onClick={() => {
              closeDeleteProduct();
              handleDeleteCategory(deleteRow);
            }}
            variant="filled"
            leftSection={<IconChevronRight />}
          >
            Tiếp tục
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
