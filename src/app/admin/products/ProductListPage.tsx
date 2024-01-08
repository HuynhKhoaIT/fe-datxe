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
  IconPlus,
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
  dataSource,
  setPage,
  activePage,
  categoryOptions,
  getData,
}: any) {
  // console.log(productsGara);
  const router = useRouter();
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteProduct = async (idProduct: any) => {
    await fetch(`/api/products/${idProduct}`, {
      method: "DELETE",
    });
    const deleteProduct = fetch(`/api/products/${idProduct}`, {
      method: "DELETE",
    });
    console.log(deleteProduct);
    notifications.show({
      title: "Thành công",
      message: "Xoá sản phẩm thành công",
    });
    // getData();
    router.refresh();
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
      dataIndex: ["thumbnail"],
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
      label: <span>Tên sản phẩm</span>,
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span>Số lượng</span>,
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
    },
    {
      label: <span>Giá bán</span>,
      name: "price",
      dataIndex: ["price"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span>Giá sale</span>,
      name: "priceSale",
      dataIndex: ["salePrice"],
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
                pathname: `/admin/products/${record.id}`,
              }}
            >
              <Tooltip label="Cập nhật" withArrow position="bottom">
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
              </Tooltip>
            </Link>

            <Tooltip label="Xoá" withArrow position="bottom">
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
            </Tooltip>
          </>
        );
      },
    },
  ];
  const [activeTab, setActiveTab] = useState<string | null>("product");
  const searchData = [
    {
      name: "s",
      placeholder: "Tên sản phẩm",
      type: "input",
    },
    {
      name: "categoryId",
      placeholder: "Danh mục",
      type: "select",
      data: categoryOptions,
    },
  ];
  return (
    <div className={styles.listPage}>
      <SearchForm searchData={searchData} />
      <Flex justify={"end"} align={"center"}>
        {/* <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
          Danh sách sản phẩm
        </Typo> */}
        <Link
          href={{
            pathname: `/admin/products/create`,
          }}
        >
          <Button leftSection={<IconPlus size={14} />}>Thêm mới</Button>
        </Link>
      </Flex>
      <Space h={20} />
      <TableBasic data={dataSource} columns={columns} loading={true} />
      <PaginationBase activePage={activePage} setPage={setPage} />

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
              handleDeleteProduct(deleteRow);
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
