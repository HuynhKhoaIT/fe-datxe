"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Flex, Image, Tabs } from "@mantine/core";
import { IconPencil,IconFilter, IconPlus, IconTrash } from "@tabler/icons-react";
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
import Typo from "@/app/components/elements/Typo";
const DynamicModalDeleteProduct = dynamic(
  () => import("../board/ModalDeleteProduct"),
  {
    ssr: false,
  }
);

// const DynamicModalCustomers = dynamic(() => import("./ModalCustomersDLBD"), {
//   ssr: false,
// });
export default function CustomerListPage({
  dataSource,
  activeTab,
  setActiveTab,
  page,
  setPage,
}: any) {
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteCustomer = async (id: any) => {
    await fetch(`/api/customer/${id}`, {
      method: "DELETE",
    });
    notifications.show({
      title: "Thành công",
      message: "Xoá thành công",
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
      <div style={{ background: "#fff", marginBottom: 30 }}>
        <div style={{borderBottom: "1px solid #eeeeee"}}>
        <Typo
          size="18px"
          type="bold"
          style={{ color: "var(--primary-orange)", padding: "16px 30px" }}
        >
          <IconFilter size={22} />Tìm kiếm
        </Typo>
        </div>
        <div style={{ padding: 30 }}>
          <SearchForm
            searchData={searchData}
            initialValues={initialValuesSearch}
          />
        </div>
      </div>
      <div style={{marginBottom: 20,}}>
      <Button
        size="lg"
        radius={0}
        leftSection={<IconPlus size={18} />}
      >
        Thêm mới
      </Button>
      </div>
      <div style={{ background: "#fff", position: "relative" }}>
        {/* <div className={styles.title}>
          <Typo
            size="small"
            type="bold"
            style={{ color: "var(--primary-orange)", padding: "8px 20px" }}
          >
            Khách hàng
          </Typo>
        </div> */}

        <div style={{borderBottom: "1px solid #eeeeee"}}>
          <Typo
            size="18px"
            type="bold"
            style={{ color: "var(--primary-orange)", padding: "16px 30px" }}
          >
            <IconFilter size={22} />Danh sách
          </Typo>
        </div>
        
        <div >
          <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
          <Tabs.List classNames={{ list: styles.list }}>
              <Tabs.Tab value="first">Khách hàng trên sàn</Tabs.Tab>
              <Tabs.Tab value="second">Khách hàng trên phần mềm</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first">
              <ListPage
                actionBar={
                  <Flex justify={"end"} align={"center"} gap={20}>
                    <Link
                      href={{
                        pathname: `/admin/customers/create`,
                      }}
                    >
                      
                    </Link>
                  </Flex>
                }
                style={{ height: "100%" }}
                baseTable={
                  <TableBasic
                    data={dataSource?.data}
                    columns={columns}
                    loading={true}
                    totalPage={dataSource?.totalPage}
                    setPage={setPage}
                    activePage={page}
                  />
                }
              />
            </Tabs.Panel>
            <Tabs.Panel value="second">
              <ListPage
                actionBar={
                  <Flex justify={"end"} align={"center"} gap={20}>
                    <Link
                      href={{
                        pathname: `/admin/customers/create`,
                      }}
                    >
                      <Button
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
                baseTable={
                  <TableBasic
                    data={dataSource?.data}
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
        </div>
      </div>

      <DynamicModalDeleteProduct
        openedDeleteProduct={openedDeleteProduct}
        closeDeleteProduct={closeDeleteProduct}
        handleDeleteProduct={handleDeleteCustomer}
        deleteRow={deleteRow}
      />
      {/* {openedModalCustomers && (
        <DynamicModalCustomers
          openedModalCustomers={openedModalCustomers}
          closeModalCustomers={closeModalCustomers}
        />
      )} */}
    </div>
  );
}
