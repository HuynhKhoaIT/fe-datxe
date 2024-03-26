"use client";
import React, { useEffect, useState } from "react";
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
import ListPage from "@/app/components/layout/ListPage";
import axios from "axios";
import useFetch from "@/app/hooks/useFetch";
import { useSearchParams } from "next/navigation";
import { getCategories } from "./until";
import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

const DynamicModalDeleteItem = dynamic(
  () => import("../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
const DynamicModalCategories = dynamic(() => import("./ModalCategoriesDLBD"));
export default function CategoryListPage({ profile }: any) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const [deleteRow, setDeleteRow] = useState();

  const handleDeleteItem = async (id: any) => {
    try {
      await axios.delete(`/api/product-category/${id}`);
      notifications.show({
        title: "Thành công",
        message: "Xoá danh mục thành công",
      });
      refetch();
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const [
    openedModalCategories,
    { open: openModalCategories, close: closeModalCategories },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
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
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Tên</span>
      ),
      name: "title",
      dataIndex: ["title"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
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
      render: (record: any) => {
        return (
          <Flex>
            <Link
              href={{
                pathname: `/admin/categories/${record.id}`,
              }}
            >
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
            </Link>

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

  const {
    data: categories,
    isLoading: loadingCategories,
    isPlaceholderData,
    isFetching: isFetchingCategories,
    refetch,
  } = useFetch({
    queryKey: ["categories", searchParams.toString(), page],
    queryFn: () => getCategories(searchParams.toString(), page),
  });

  useEffect(() => {
    if (!isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ["categories", searchParams.toString(), page],
        queryFn: () => getCategories(searchParams.toString(), page),
        staleTime: Infinity,
      });
    }
  }, [searchParams, isPlaceholderData, page, queryClient, categories]);
  console.log(isFetchingCategories);
  return (
    <div>
      <ListPage
        searchForm={
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
        }
        actionBar={
          <Flex justify={"end"} align={"center"} gap={20}>
            <Button
              size="lg"
              h={{ base: 42, md: 50, lg: 50 }}
              radius={0}
              onClick={openModalCategories}
              leftSection={<IconPlus size={18} />}
            >
              Đồng bộ
            </Button>
            <Link
              href={{
                pathname: `/admin/categories/create`,
              }}
            >
              <Button
                h={{ base: 42, md: 50, lg: 50 }}
                size="lg"
                radius={0}
                leftSection={<IconPlus size={18} />}
              >
                Thêm mới
              </Button>
            </Link>
          </Flex>
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableBasic
            data={categories?.data}
            columns={columns}
            loading={loadingCategories || isFetchingCategories}
            totalPage={categories?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />

      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
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
