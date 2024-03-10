"use client";
import React, { Fragment, useState } from "react";
import ImageDefult from "../../../../public/assets/images/logoDatxe.png";
import { Badge, Button, Flex, Image, Tabs } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { statusOptions } from "@/constants/masterData";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
const DynamicModalDeleteProduct = dynamic(
  () => import("../board/ModalDeleteProduct"),
  {
    ssr: false,
  }
);
export default function CarsListPage({
  dataSource,
  activeTab,
  setActiveTab,
}: any) {
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteCategory = async (id: any) => {
    await fetch(`/api/cars/${id}`, {
      method: "DELETE",
    });
    notifications.show({
      title: "Thành công",
      message: "Xoá xe thành công",
    });
  };
  const [
    openedDeleteProduct,
    { open: openDeleteProduct, close: closeDeleteProduct },
  ] = useDisclosure(false);
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Biển số xe
        </span>
      ),
      name: "title",
      dataIndex: ["numberPlates"],
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
      name: "carBrandId",
      dataIndex: ["carBrandId"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Dòng xe</span>
      ),
      name: "carNameId",
      dataIndex: ["carNameId"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Năm sản xuất
        </span>
      ),
      name: "carYearId",
      dataIndex: ["carYearId"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Loại xe</span>
      ),
      name: "carYearId",
      dataIndex: ["carYearId"],
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
            <Badge color={matchedStatus.color} key={record}>
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
  return (
    <Fragment>
      <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab h={42} value="first">
            Xe trên sàn
          </Tabs.Tab>
          <Tabs.Tab h={42} value="second">
            Xe trên phần mềm
          </Tabs.Tab>
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
              <Flex justify={"end"} align={"center"}>
                <Link
                  href={{
                    pathname: `/admin/cars/create`,
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
              <Flex justify={"end"} align={"center"}>
                <Link
                  href={{
                    pathname: `/admin/cars/create`,
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
        handleDeleteProduct={handleDeleteCategory}
        deleteRow={deleteRow}
      />
    </Fragment>
  );
}
