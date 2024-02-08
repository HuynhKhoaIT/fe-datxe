"use client";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";
import { kindProductOptions, statusOptions } from "@/constants/masterData";
import { Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import styles from "./index.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Chuyên gia" },
];
const Expert = () => {
  const searchParams = useSearchParams();

  const [experts, setExperts] = useState<any>();
  const [categoryOptions, setCategoryOptions] = useState<any>([]);

  const [page, setPage] = useState<number>(1);

  const columns = [
    {
      label: <span>Hình ảnh</span>,
      name: "image",
      dataIndex: ["images"],
      width: "90px",
      render: (data: any) => {
        const images = JSON.parse(data);
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
          <Image radius="md " h={40} w={80} fit="contain" src={images[0]} />
        );
      },
    },
    {
      label: <span>Mã chuyên gia</span>,
      name: "code",
      dataIndex: ["code"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span>Tên chuyên gia</span>,
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span>Tên rút gọn</span>,
      name: "sortName",
      dataIndex: ["sortName"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: <span>Số điện thoại</span>,
      name: "phoneNumber",
      dataIndex: ["phoneNumber"],
      textAlign: "center",
    },
    {
      label: <span>Email</span>,
      name: "email",
      dataIndex: ["email"],
    },
    {
      label: <span>Địa chỉ</span>,
      name: "address",
      dataIndex: ["address"],
    },

    {
      label: <span>Trạng thái</span>,
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
      label: <span>Hành động</span>,
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
                // onClick={(e) => {
                //   openDeleteProduct();
                //   setDeleteRow(record.id);
                // }}
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
    <div className={styles.wrapper}>
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
              <Button leftSection={<IconPlus size={14} />}>Thêm mới</Button>
            </Link>
          </Flex>
        }
        style={{ height: "100%" }}
        baseTable={
          <TableBasic
            data={experts}
            columns={columns}
            loading={true}
            totalPage={experts?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
    </div>
  );
};
export default Expert;
