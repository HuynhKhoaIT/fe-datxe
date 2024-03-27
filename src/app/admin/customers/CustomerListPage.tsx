"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Flex, Image, Tabs } from "@mantine/core";
import {
  IconPencil,
  IconFilter,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { sexOptions, statusOptions } from "@/constants/masterData";
import SearchForm from "@/app/components/form/SearchForm";
import dayjs from "dayjs";
import ListPage from "@/app/components/layout/ListPage";
import styles from "./index.module.scss";
import axios from "axios";
const DynamicModalDeleteItem = dynamic(
  () => import("../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);

export default function CustomerListPage({
  customers,
  customersDlbd,
  activeTab,
  setActiveTab,
  page,
  setPage,
  isLoading,
  isLoadingDlbd,
  refetch,
}: any) {
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteItem = async (id: any) => {
    try {
      await axios.delete(`/api/customer/${id}`);
      notifications.show({
        title: "Thành công",
        message: "Xoá thành công",
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
    openedModalCustomers,
    { open: openModalCustomers, close: closeModalCustomers },
  ] = useDisclosure(false);
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên khách hàng
        </span>
      ),
      name: "fullname",
      dataIndex: activeTab === "first" ? ["fullName"] : ["name"],
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
      dataIndex: activeTab === "first" ? ["phoneNumber"] : ["phone_number"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Ngày sinh
        </span>
      ),
      name: "dob",
      dataIndex: ["dob"],
      render: (dob: any) => {
        return <>{dob ? dayjs(dob).format("DD-MM-YYYY") : null}</>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Giới tính
        </span>
      ),
      name: "sex",
      dataIndex: ["sex"],
      width: "100px",
      render: (record: any) => {
        const matchedStatus = sexOptions.find((item) => item.value === record);
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
    activeTab === "first" && {
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
    activeTab === "first" && {
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
                pathname: `/admin/customers/${record.id}`,
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
          </>
        );
      },
    },
  ];

  const searchData = [
    {
      name: "s",
      placeholder: "Tên",
      type: "input",
    },
    {
      name: "group",
      placeholder: "Nhóm khách hàng",
      type: "select",
      // dataSource
    },
  ];
  const initialValuesSearch = {
    s: "",
    phone: "",
    group: "",
  };

  return (
    <div>
      <SearchForm searchData={searchData} initialValues={initialValuesSearch} />
      <div style={{ marginBottom: 20 }}>
        <Flex justify={"end"} align={"center"} gap={20}>
          <Link
            href={{
              pathname: `/admin/customers/create`,
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
      <div style={{ background: "#fff", position: "relative" }}>
        <div>
          <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
            <Tabs.List classNames={{ list: styles.list }}>
              <Tabs.Tab
                h={{ base: 42, md: 50, lg: 50 }}
                classNames={{ tab: styles.tab }}
                value="first"
              >
                Khách hàng trên sàn
              </Tabs.Tab>
              <Tabs.Tab
                h={{ base: 42, md: 50, lg: 50 }}
                classNames={{ tab: styles.tab }}
                value="second"
              >
                Khách hàng trên phần mềm
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first">
              <ListPage
                style={{ height: "100%" }}
                baseTable={
                  <TableBasic
                    data={customers?.data}
                    columns={columns}
                    loading={isLoading}
                    totalPage={customers?.totalPage}
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
                    data={customersDlbd?.data}
                    columns={columns}
                    loading={isLoadingDlbd}
                    // totalPage={marketing?.totalPage}
                    // setPage={setPage}
                    // activePage={page}
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
    </div>
  );
}
