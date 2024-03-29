"use client";
import React, { Fragment, useState } from "react";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import { Badge, Button, Flex, Image, Tabs } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { statusOptions } from "@/constants/masterData";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import styles from "./index.module.scss";
const DynamicModalDeleteItem = dynamic(
  () => import("../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
export default function CarsListPage({
  cars,
  carsDlbd,
  activeTab,
  setActiveTab,
  page,
  setPage,
  loading,
  deleteItem,
}: any) {
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteItem = (id: string) => {
    deleteItem(id);
  };

  const [
    openedDeleteItem,
    { open: openDeleteItem, close: closeDeleteItem },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Biển số xe
        </span>
      ),
      name: "title",
      dataIndex: activeTab == "first" ? ["numberPlates"] : ["licensePlates"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Màu xe</span>
      ),
      name: "color",
      dataIndex: ["color"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hãng xe</span>
      ),
      name: "brandName",
      dataIndex:
        activeTab == "first"
          ? ["brandName", "title"]
          : ["brandCarName", "name"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Dòng xe</span>
      ),
      name: "modelName",
      dataIndex:
        activeTab == "first"
          ? ["modelName", "title"]
          : ["modelCarName", "name"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Năm sản xuất
        </span>
      ),
      name: "yearName",
      dataIndex: ["yearName", "title"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Loại xe</span>
      ),
      name: "carStyle",
      dataIndex: ["carStyle", "name"],
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
                pathname: `/admin/cars/${record.id}`,
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
                openDeleteItem();
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
      name: "place",
      placeholder: "Biển số",
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
    place: "",
    status: null,
    brandId: null,
    nameId: null,
    yearId: null,
  };
  return (
    <Fragment>
      <div style={{ background: "#fff", marginBottom: 30 }}>
        <SearchForm
          searchData={searchData}
          initialValues={initialValuesSearch}
          brandFilter={true}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <Flex justify={"end"} align={"center"}>
          <Link
            href={{
              pathname: `/admin/cars/create`,
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
                Xe trên sàn
              </Tabs.Tab>
              <Tabs.Tab
                h={{ base: 42, md: 50, lg: 50 }}
                classNames={{ tab: styles.tab }}
                value="second"
              >
                Xe trên phần mềm
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first">
              <ListPage
                style={{ height: "100%" }}
                baseTable={
                  <TableBasic
                    data={cars?.data}
                    columns={columns}
                    loading={loading}
                    totalPage={cars?.totalPage}
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
                    data={carsDlbd?.data}
                    columns={columns}
                    loading={loading}
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
    </Fragment>
  );
}
