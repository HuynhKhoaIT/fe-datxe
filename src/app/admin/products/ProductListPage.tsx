"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Pagination,
  Radio,
  Table,
} from "@mantine/core";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
export default function ProductListPage({ categories }: any) {
  const [posts, setPosts] = useState([]);
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
          <Table.Td align="center">
            <img src={record.thumbnail} alt="" width={50} />
          </Table.Td>
          <Table.Td>{record.name}</Table.Td>
          <Table.Td>{record.price}</Table.Td>
          <Table.Td>{record.price}</Table.Td>
          <Table.Td>
            <Button size="xs" p={5} variant="transparent" onClick={() => {}}>
              <IconEye size={16} />
            </Button>

            <Link href="/admin/products/update">
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
              onClick={(e) => {}}
            >
              <IconTrash size={16} color="red" />
            </Button>
          </Table.Td>
        </Table.Tr>
      ));
    }
  };
  return (
    <div>
      <Flex justify={"end"} mb={20}>
        <Link href="/admin/products/create">
          <Button>Thêm sản phẩm</Button>
        </Link>
      </Flex>
      <div className="row">
        <div className="col-12">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th align="center">Hình ảnh</Table.Th>
                <Table.Th>Tên</Table.Th>
                <Table.Th>Giá bán thường</Table.Th>
                <Table.Th>Giá khuyến mãi</Table.Th>
                <Table.Th>Hành động</Table.Th>
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
    </div>
  );
}
