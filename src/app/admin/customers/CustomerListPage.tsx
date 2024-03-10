"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Badge, Button, Flex, Image, Tabs } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { sexOptions, statusOptions } from "@/constants/masterData";
import SearchForm from "@/app/components/form/SearchForm";
import dayjs from "dayjs";
import ListPage from "@/app/components/layout/ListPage";
const DynamicModalDeleteProduct = dynamic(
  () => import("../board/ModalDeleteProduct"),
  {
    ssr: false,
  }
);

const DynamicModalCustomers = dynamic(() => import("./ModalCustomersDLBD"), {
  ssr: false,
});
export default function CustomerListPage({
  dataSource,
  activeTab,
  setActiveTab,
}: any) {
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteCustomer = async (id: any) => {
    await fetch(`/api/customer/${id}`, {
      method: "DELETE",
    });
    notifications.show({
      title: "Thành công",
      message: "Xoá danh mục thành công",
    });
  };
  const [
    openedDeleteProduct,
    { open: openDeleteProduct, close: closeDeleteProduct },
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
            <Badge color={matchedStatus.color} key={record}>
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
            <Badge color={matchedStatus.color} key={record}>
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
                size="md"
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
          </>
        );
      },
    },
  ];

  const searchData = [
    {
      name: "s",
      placeholder: "Tên nhà cung cấp",
      type: "input",
    },
  ];
  const initialValuesSearch = {
    s: "",
  };

  return (
    <div>
      <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="first">Khách hàng trên sàn</Tabs.Tab>
          <Tabs.Tab value="second">Khách hàng trên phần mềm</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first">
          <ListPage
            searchForm={
              <SearchForm
                searchData={searchData}
                initialValues={initialValuesSearch}
              />
            }
            actionBar={
              <Flex justify={"end"} align={"center"} gap={20}>
                <Button
                  size="md"
                  onClick={openModalCustomers}
                  leftSection={<IconPlus size={18} />}
                >
                  Đồng bộ
                </Button>
                <Link
                  href={{
                    pathname: `/admin/customers/create`,
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
                data={dataSource}
                columns={columns}
                loading={true}
                // totalPage={marketing?.totalPage}
                // setPage={setPage}
                // activePage={page}
              />
            }
          />
        </Tabs.Panel>
        <Tabs.Panel value="second">
          <ListPage
            searchForm={
              <SearchForm
                searchData={searchData}
                initialValues={initialValuesSearch}
              />
            }
            actionBar={
              <Flex justify={"end"} align={"center"} gap={20}>
                <Button
                  size="md"
                  onClick={openModalCustomers}
                  leftSection={<IconPlus size={18} />}
                >
                  Đồng bộ
                </Button>
                <Link
                  href={{
                    pathname: `/admin/customers/create`,
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
                data={dataSource}
                columns={columns}
                loading={true}
                // totalPage={marketing?.totalPage}
                // setPage={setPage}
                // activePage={page}
              />
            }
          />
        </Tabs.Panel>
      </Tabs>

      <DynamicModalDeleteProduct
        openedDeleteProduct={openedDeleteProduct}
        closeDeleteProduct={closeDeleteProduct}
        handleDeleteProduct={handleDeleteCustomer}
        deleteRow={deleteRow}
      />
      {openedModalCustomers && (
        <DynamicModalCustomers
          openedModalCustomers={openedModalCustomers}
          closeModalCustomers={closeModalCustomers}
        />
      )}
    </div>
  );
}
