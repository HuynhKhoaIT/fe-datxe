"use client";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";
import { statusOptions } from "@/constants/masterData";
import { Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { useExperts } from "../hooks/expert/useExpert";

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Chuyên gia" },
];

const DynamicModalDeleteItem = dynamic(
  () => import("../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
const Expert = () => {
  const {
    experts,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    deleteItem,
  } = useExperts();

  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteItem = (id: any) => {
    deleteItem(id);
  };

  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const columns = [
    // {
    //   label: (
    //     <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
    //   ),
    //   name: "image",
    //   dataIndex: ["logo"],
    //   width: "90px",
    //   render: (data: any) => {
    //     const image = JSON.parse(data);
    //     if (!image) {
    //       return (
    //         <Image
    //           radius="md"
    //           src={ImageDefult.src}
    //           h={40}
    //           w="auto"
    //           fit="contain"
    //         />
    //       );
    //     }
    //     return <Image radius="md " h={40} w={80} fit="contain" src={image} />;
    //   },
    // },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Mã chuyên gia
        </span>
      ),
      name: "code",
      dataIndex: ["code"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên chuyên gia
        </span>
      ),
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên rút gọn
        </span>
      ),
      name: "shortName",
      dataIndex: ["shortName"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Số điện thoại
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["phoneNumber"],
      textAlign: "center",
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Email</span>
      ),
      name: "email",
      dataIndex: ["email"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Địa chỉ</span>
      ),
      name: "address",
      dataIndex: ["address"],
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
                pathname: `/admin/expert/${record.id}`,
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
      placeholder: "Tên chuyên gia",
      type: "input",
    },
  ];

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
            data={experts?.data}
            columns={columns}
            loading={isLoading}
            totalPage={experts?.totalPage}
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
export default Expert;
