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
  Radio,
  Table,
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
export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    handlers.open();

    const response = await fetch("/api/products", {
      method: "GET",
    });
    const data = await response.json();
    setProducts(data);
    handlers.close();
    return data;
  };
  const handleDeleteProduct = async (id: any) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    notifications.show({
      title: "Thành công",
      message: "Xoá sản phẩm thành công",
    });
    getProducts();
  };
  const [
    openedDeleteProduct,
    { open: openDeleteProduct, close: closeDeleteProduct },
  ] = useDisclosure(false);
  const [totalPage, setTotalPage] = useState(0);
  const [visible, handlers] = useDisclosure(false);
  useEffect(() => {
    getProducts();
  }, []);
  const renderRows = () => {
    if (visible) {
      return (
        <Box w={"100%"} h={100}>
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        </Box>
      );
    } else {
      return products?.map((record: any) => (
        <Table.Tr key={record.id}>
          <Table.Td w={120}>
            <img src={record.thumbnail} alt="" width={50} />
          </Table.Td>
          <Table.Td>{record.name}</Table.Td>
          <Table.Td w={200} align="right">
            {record.price}
          </Table.Td>
          <Table.Td w={200} align="right">
            {record.price}
          </Table.Td>
          <Table.Td w={150} align="center">
            {/* <Button size="xs" p={5} variant="transparent" onClick={() => {}}>
              <IconEye size={16} />
            </Button> */}
            <Link
              href={{
                pathname: `/admin/products/${record.id}`,
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
                handleDeleteProduct(record.id);
              }}
            >
              <IconTrash size={16} color="red" />
            </Button>
          </Table.Td>
        </Table.Tr>
      ));
    }
  };
  return (
    <div className={styles.content}>
      <Flex justify={"space-between"} align={"center"}>
        <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
          Tất cả sản phẩm
        </Typo>
        <Link
          href={{
            pathname: `/admin/products/create`,
          }}
        >
          <Button>Thêm sản phẩm</Button>
        </Link>
      </Flex>
      <div className="row">
        <div className="col-12">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Hình ảnh</Table.Th>
                <Table.Th>Tên</Table.Th>
                <Table.Th style={{ textAlign: "right" }}>
                  Giá bán thường
                </Table.Th>
                <Table.Th style={{ textAlign: "right" }}>
                  Giá khuyến mãi
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Hành động</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody style={{ position: "relative" }}>
              {renderRows()}
            </Table.Tbody>
          </Table>
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
        title="Xoá sản phẩm"
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
              // handleDeleteProduct(deleteRow);
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
