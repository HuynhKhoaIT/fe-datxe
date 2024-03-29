"use client";
export const revalidate = 0;
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge, Button, Flex, Image, Tabs, Tooltip } from "@mantine/core";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import { kindProductOptions, statusOptions } from "@/constants/masterData";
import Link from "next/link";
import {
  IconArrowUp,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import ListPage from "@/app/components/layout/ListPage";
import styles from "./index.module.scss";
import axios from "axios";
import useFetch from "@/app/hooks/useFetch";
import { QueryClient } from "@tanstack/react-query";
import { getOptionsCategories } from "@/utils/until";
import { getProducts, getProductsDLBD } from "./until";
import FilterCategories from "@/app/components/common/FilterCategory/FilterCategories";
const DynamicModalDeleteItem = dynamic(
  () => import("../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
const queryClient = new QueryClient();
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Sản phẩm" },
];

export default function ProductsManaga() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const [page, setPage] = useState<number>(1);
  const [pageDlbd, setPageDlbd] = useState<number>(1);

  const [deleteRow, setDeleteRow] = useState();
  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const { data: categoryOptions } = useFetch({
    queryKey: ["categoryOptions"],
    queryFn: () => getOptionsCategories(),
    options: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
    },
  });

  const {
    data: products,
    isLoading,
    error,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useFetch({
    queryKey: ["products", searchParams.toString(), page],
    queryFn: () => getProducts(searchParams.toString(), page),
  });
  const {
    data: productsDlbd,
    isLoading: isLoadingDlbd,
    isPlaceholderData: isPlaceholderDataDlbd,
  } = useFetch({
    queryKey: ["productsDlbd", searchParams.toString(), pageDlbd],
    queryFn: () => getProductsDLBD(searchParams.toString(), pageDlbd),
  });

  useEffect(() => {
    console.log("searchParams", searchParams.toString());
    if (activeTab == "first" && !isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ["products", searchParams.toString(), page],
        queryFn: () => getProducts(searchParams.toString(), page),
        staleTime: Infinity,
      });
    }
  }, [searchParams, isPlaceholderData, page, queryClient, activeTab, products]);
  useEffect(() => {
    console.log("searchParams", searchParams.toString());
    if (activeTab == "second" && !isPlaceholderDataDlbd) {
      queryClient.prefetchQuery({
        queryKey: ["productsDlbd", searchParams.toString(), pageDlbd],
        queryFn: () => getProductsDLBD(searchParams.toString(), pageDlbd),
        staleTime: Infinity,
      });
    }
  }, [
    searchParams,
    pageDlbd,
    queryClient,
    activeTab,
    productsDlbd,
    isPlaceholderDataDlbd,
  ]);

  const handleDeleteItem = async (idProduct: any) => {
    try {
      await axios.delete(`/api/products/${idProduct}`);
      notifications.show({
        title: "Thành công",
        message: "Xoá sản phẩm thành công",
      });
      refetch();
    } catch (error) {
      console.error("error:", error);
    }
  };

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "image",
      dataIndex: activeTab === "first" ? ["images"] : ["thumbnail"],
      width: "90px",
      render: (data: any) => {
        if (activeTab === "first" && data) {
          const images = JSON?.parse(data);
          if (!images) {
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
          return (
            <Image radius="md " h={40} w={40} fit="cover" src={images[0]} />
          );
        } else {
          return <Image radius="md " h={40} w={40} fit="cover" src={data} />;
        }
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên sản phẩm
        </span>
      ),
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    activeTab === "first" && {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Số lượng</span>
      ),
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá bán</span>
      ),
      name: "price",
      dataIndex: ["price"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    activeTab === "first" && {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá sale</span>
      ),
      name: "priceSale",
      dataIndex: ["salePrice"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    activeTab === "first" && {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Loại</span>
      ),
      name: "kind",
      dataIndex: ["isProduct"],
      width: "100px",
      render: (record: any, index: number) => {
        const matchedStatus = kindProductOptions.find(
          (item) => item.value === record?.toString()
        );
        if (matchedStatus) {
          return (
            <Badge
              radius={0}
              size="lg"
              variant="light"
              color={matchedStatus.color}
              key={index}
            >
              {matchedStatus.label}
            </Badge>
          );
        }
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Trạng thái
        </span>
      ),
      name: "status",
      dataIndex: ["status"],
      width: "100px",
      render: (record: any) => {
        const matchedStatus = statusOptions.find(
          (item) => item.value === record
        );
        if (matchedStatus) {
          return (
            <Badge
              variant="light"
              radius={0}
              size="lg"
              color={matchedStatus.color}
              key={record}
            >
              {matchedStatus.label}
            </Badge>
          );
        }
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "100px",
      textAlign: "center",
      render: (record: any) => {
        if (activeTab === "first") {
          return (
            <>
              <Link
                href={{
                  pathname: `/admin/products/${record.id}`,
                }}
              >
                <Tooltip label="Cập nhật" withArrow position="bottom">
                  <Button
                    size="lg"
                    radius={0}
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
                  size="lg"
                  radius={0}
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
        }
        return (
          <>
            <Tooltip label="Lên sàn" withArrow position="bottom">
              <Button
                size="lg"
                radius={0}
                p={5}
                variant="transparent"
                color="red"
                onClick={(e) => {
                  router.push(
                    `/admin/products/direction?productId=${record.id}`
                  );
                }}
              >
                <IconArrowUp size={16} color="red" />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];
  const searchData = [
    {
      name: "s",
      placeholder: "Tên sản phẩm",
      type: "input",
    },
    {
      name: "isProduct",
      placeholder: "Loại",
      type: "select",
      data: kindProductOptions,
    },
  ];
  const initialValuesSearch = {
    s: "",
    brandId: null,
    nameId: null,
    yearId: null,
  };

  console.log(products?.data);
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div style={{ background: "#fff", marginBottom: 30 }}>
        <SearchForm
          searchData={searchData}
          brandFilter={true}
          initialValues={initialValuesSearch}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <Flex justify={"end"} align={"center"} gap={20}>
          <Link
            href={{
              pathname: `/admin/products/create`,
            }}
          >
            <Button
              size="lg"
              h={{ base: 42, md: 50, lg: 50 }}
              radius={0}
              leftSection={<IconPlus size={18} />}
            >
              Thêm mới
            </Button>
          </Link>
        </Flex>
      </div>

      <FilterCategories categories={categoryOptions} />

      <div style={{ background: "#fff", position: "relative" }}>
        <div>
          <Tabs
            variant="pills"
            value={activeTab}
            onChange={(value) => {
              setActiveTab(value);
              setPage(1);
              setPageDlbd(1);
            }}
          >
            <Tabs.List classNames={{ list: styles.list }}>
              <Tabs.Tab
                h={{ base: 42, md: 50, lg: 50 }}
                classNames={{ tab: styles.tab }}
                value="first"
              >
                Sản phẩm trên sàn
              </Tabs.Tab>
              <Tabs.Tab
                h={{ base: 42, md: 50, lg: 50 }}
                classNames={{ tab: styles.tab }}
                value="second"
              >
                Sản phẩm trên phần mềm
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first">
              <ListPage
                actionBar={
                  <Flex justify={"end"} align={"center"} gap={20}>
                    <Link
                      href={{
                        pathname: `/admin/customers/create`,
                      }}
                    ></Link>
                  </Flex>
                }
                style={{ height: "100%" }}
                baseTable={
                  <TableBasic
                    data={products?.data}
                    columns={columns}
                    loading={isLoading}
                    totalPage={products?.totalPage}
                    setPage={setPage}
                    activePage={page}
                  />
                }
              />
            </Tabs.Panel>
            <Tabs.Panel value="second">
              <ListPage
                style={{ height: "100%" }}
                baseTable={
                  <TableBasic
                    data={productsDlbd?.data}
                    columns={columns}
                    loading={isLoadingDlbd}
                    totalPage={productsDlbd?.last_page}
                    setPage={setPageDlbd}
                    activePage={pageDlbd}
                  />
                }
              />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
        deleteRow={deleteRow}
      />
    </Fragment>
  );
}
