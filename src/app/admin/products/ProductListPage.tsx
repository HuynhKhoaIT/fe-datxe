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
export default function ProductListPage({ categories }: any) {
  const [posts, setPosts] = useState([]);
  const [
    openedDeleteProduct,
    { open: openDeleteProduct, close: closeDeleteProduct },
  ] = useDisclosure(false);
  const [deleteRow, setDeleteRow] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [meta, setMetas] = useState([]);
  const [visible, handlers] = useDisclosure(false);
  useEffect(() => {
    const data = axios
      .get(
        "https://v2.dlbd.vn/api/v3/guest/products?is_product=1&page=1&limit=8&cat_id=1&garage_id=19"
      )
      .then((res) => {
        setPosts(res.data.data);
        setMetas(res.data.meta);
        setTotalPage(res.data.meta.total);
      });
  }, []);
  //   const handleDeleteProduct = async (carId: string) => {
  //     try {
  //         await deleteCar(carId, token ?? '');
  //         fetchCars();
  //     } catch (error) {
  //         console.error('Error deleting car:', error);
  //     }
  // };
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
      return posts?.map((record: any) => (
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
            <Link href={`/admin/products/${record.id}`}></Link>
            <Button size="xs" p={5} variant="transparent" onClick={() => {}}>
              <IconEye size={16} />
            </Button>

            <Link
              href={{
                pathname: `/admin/products/${record.id}`,
                // query: { name: "test" },
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
          </Table.Td>
        </Table.Tr>
      ));
    }
  };
  return (
    <div className={styles.content}>
      <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Tất cả sản phẩm
      </Typo>
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
