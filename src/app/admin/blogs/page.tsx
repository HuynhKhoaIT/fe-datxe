"use client";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";
import { kindProductOptions, statusOptions } from "@/constants/masterData";
import { Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import Link from "next/link";
import { Fragment, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import dynamic from "next/dynamic";
import axios from "axios";
import useFetch from "@/app/hooks/useFetch";
import { QueryClient } from "@tanstack/react-query";
import { getBlogs } from "./until";
const queryClient = new QueryClient();

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Bài viết" },
];
const DynamicModalDeleteItem = dynamic(
  () => import("../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
const Blogs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [deleteRow, setDeleteRow] = useState();
  const [loadingTable, handlers] = useDisclosure(false);

  const [page, setPage] = useState<number>(1);
  const handleDeleteItem = async (idProduct: any) => {
    try {
      await axios.delete(`/api/garage/${idProduct}`);
      notifications.show({
        title: "Thành công",
        message: "Xoá bài viết thành công",
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

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "thumbnail",
      dataIndex: ["thumbnail"],
      width: "90px",
      render: (data: any) => {
        console.log(data);
        return (
          <Image
            radius="md "
            h={40}
            w={80}
            fit="contain"
            src={data || ImageDefult.src}
          />
        );
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên bài viết
        </span>
      ),
      name: "name",
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
          <>
            <Link
              href={{
                pathname: `/admin/blogs/${record.id}`,
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
      },
    },
  ];

  const searchData = [
    {
      name: "s",
      placeholder: "Tên bài viết",
      type: "input",
    },
  ];
  const {
    data: blogs,
    isLoading,
    error,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useFetch({
    queryKey: ["blogs", searchParams.toString(), page],
    queryFn: () => getBlogs(searchParams.toString(), page),
  });

  useEffect(() => {
    if (!isPlaceholderData && searchParams) {
      queryClient.prefetchQuery({
        queryKey: ["blogs", searchParams.toString(), page],
        queryFn: () => getBlogs(searchParams.toString(), page),
        staleTime: Infinity,
      });
    }
  }, [blogs, searchParams, isPlaceholderData, page, queryClient]);

  const initialValuesSearch = {
    s: "",
  };
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <ListPage
        searchForm={
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
        }
        actionBar={
          <Flex justify={"end"} align={"center"}>
            <Link
              href={{
                pathname: `/admin/blogs/create`,
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
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableBasic
            data={blogs?.data}
            columns={columns}
            loading={isLoading}
            totalPage={blogs?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
      {openedDeleteItem && (
        <DynamicModalDeleteItem
          openedDeleteItem={openedDeleteItem}
          closeDeleteItem={closeDeleteItem}
          handleDeleteItem={handleDeleteItem}
          deleteRow={deleteRow}
        />
      )}
    </Fragment>
  );
};
export default Blogs;
