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
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import Typo from "@/app/components/elements/Typo";
import { notifications } from "@mantine/notifications";
import TableBasic from "@/app/components/table/Tablebasic";
export const revalidate = 0;
import { useRouter } from "next/navigation";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
export default function ProductListPage({ dataSource, productsGara }: any) {
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
      width: "20%",
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
      width: "30%",
      render: (dataRow: any) => {
        return <h5>{dataRow}</h5>;
      },
    },
    {
      label: <span>Giá bán</span>,
      name: "price",
      dataIndex: ["price"],
      width: "15%%",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span>Giá sale</span>,
      name: "priceSale",
      dataIndex: ["salePrice"],
      width: "15%",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
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
  const columnsGara = [
    {
      label: <span>Hình ảnh</span>,
      name: "image",
      dataIndex: ["thumbnail"],
      width: "20%",
      render: (data: any) => {
        if (!data) {
          return (
            <Image
              radius="md"
              src={ImageDefult.src}
              h={40}
              w={60}
              fit="contain"
            />
          );
        }
        return <Image h={40} radius="md" w={80} fit="contain" src={data} />;
      },
    },
    {
      label: <span>Tên sản phẩm</span>,
      name: "name",
      dataIndex: ["name"],
      width: "30%",
      render: (dataRow: any) => {
        return <h5>{dataRow}</h5>;
      },
    },
    {
      label: <span>Giá bán</span>,
      name: "price",
      dataIndex: ["price"],
      width: "15%%",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span>Giá sale</span>,
      name: "priceSale",
      dataIndex: ["entryPrice"],
      width: "15%",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: <span>Hành động</span>,
      dataIndex: [],
      width: "20%",
      render: (record: any) => {
        return (
          <>
            <Tooltip label="Lên sàn" withArrow position="bottom">
              <Button
                size="xs"
                p={5}
                variant="transparent"
                color="red"
                onClick={(e) => {
                  router.push(
                    `/admin/products/direction?productId=${record.id}`
                  );
                }}
              >
                <IconPlayerTrackNext size={16} color="blue" />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];
  const [activeTab, setActiveTab] = useState<string | null>("product");
  return (
    <div className={styles.content}>
      <Flex justify={"space-between"} align={"center"}>
        <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
          Danh sách sản phẩm
        </Typo>
        <Link
          href={{
            pathname: `/admin/products/create`,
          }}
        >
          <Button>Thêm sản phẩm</Button>
        </Link>
      </Flex>
      <Space h={20} />
      <Tabs value={activeTab} variant="outline" onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="product">Sản phẩm trên sàn</Tabs.Tab>
          <Tabs.Tab value="allProduct">Sản phẩm trong kho</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="product">
          <TableBasic data={dataSource} columns={columns} loading={true} />
          <Pagination
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "end",
            }}
            total={totalPage}
            // onChange={())}
          />
        </Tabs.Panel>

        <Tabs.Panel value="allProduct">
          <TableBasic data={productsGara} columns={columnsGara} />
        </Tabs.Panel>
      </Tabs>
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
