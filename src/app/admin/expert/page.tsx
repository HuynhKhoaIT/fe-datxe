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
import { Fragment, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import dynamic from "next/dynamic";

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Chuyên gia" },
];
const DynamicModalDeleteProduct = dynamic(
  () => import("../board/ModalDeleteProduct"),
  {
    ssr: false,
  }
);
const Expert = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [deleteRow, setDeleteRow] = useState();

  const [experts, setExperts] = useState<any>();

  const [page, setPage] = useState<number>(1);
  const handleDeleteProduct = async (idProduct: any) => {
    await fetch(`/api/garage/${idProduct}`, {
      method: "DELETE",
    });
    notifications.show({
      title: "Thành công",
      message: "Xoá sản phẩm thành công",
    });
    getData(searchParams, page);
    router.refresh();
  };
  const [
    openedDeleteProduct,
    { open: openDeleteProduct, close: closeDeleteProduct },
  ] = useDisclosure(false);
  const columns = [
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Hình ảnh</span>,
      name: "image",
      dataIndex: ["logo"],
      width: "90px",
      render: (data: any) => {
        const image = JSON.parse(data);
        if (!image) {
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
        return <Image radius="md " h={40} w={80} fit="contain" src={image} />;
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Mã chuyên gia</span>,
      name: "code",
      dataIndex: ["code"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Tên chuyên gia</span>,
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Tên rút gọn</span>,
      name: "shortName",
      dataIndex: ["shortName"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Số điện thoại</span>,
      name: "phoneNumber",
      dataIndex: ["phoneNumber"],
      textAlign: "center",
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Email</span>,
      name: "email",
      dataIndex: ["email"],
    },
    {
      label: <span style={{ whiteSpace: "nowrap" }}>Địa chỉ</span>,
      name: "address",
      dataIndex: ["address"],
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
          <>
            <Link
              href={{
                pathname: `/admin/expert/${record.id}`,
              }}
            >
              <Tooltip label="Cập nhật" withArrow position="bottom">
                <Button
                  size="md"
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
                size="md"
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
  async function getData(searchParams: any, page: number) {
    const res = await fetch(`/api/garage?${searchParams}&page=${page}`, {
      method: "GET",
    });
    const data = await res.json();
    setExperts(data);
  }
  const searchData = [
    {
      name: "s",
      placeholder: "Tên chuyên gia",
      type: "input",
    },
  ];
  useEffect(() => {
    getData(searchParams.toString(), page);
  }, [searchParams, page]);
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
                pathname: `/admin/expert/create`,
              }}
            >
              <Button size="md" leftSection={<IconPlus size={18} />}>
                Thêm mới
              </Button>
            </Link>
          </Flex>
        }
        style={{ height: "100%" }}
        baseTable={
          <TableBasic
            data={experts?.data}
            columns={columns}
            loading={true}
            totalPage={experts?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
      <DynamicModalDeleteProduct
        openedDeleteProduct={openedDeleteProduct}
        closeDeleteProduct={closeDeleteProduct}
        handleDeleteProduct={handleDeleteProduct}
        deleteRow={deleteRow}
      />
    </Fragment>
  );
};
export default Expert;
