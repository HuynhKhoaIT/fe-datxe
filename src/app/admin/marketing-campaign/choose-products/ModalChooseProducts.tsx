"use client";
import {
  Badge,
  Button,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  ScrollArea,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import ImageDefult from "../../../../../public/assets/images/logoDatxe.png";
import { kindProductOptions, statusOptions } from "@/constants/masterData";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import { useSearchParams } from "next/navigation";
import { IconBan, IconChevronRight } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import ItemProductChoose from "../_component/ItemProductChoose";

export default function ModalChooseProducts({
  openModal,
  close,
  selectedProducts,
  setSelectedProducts,
}: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  const [selectedRows, setSelectedRows] = useState<any>(selectedProducts);

  useEffect(() => {
    if (selectedProducts) setSelectedRows(selectedProducts);
  }, [selectedProducts]);
  const [products, setProducts] = useState<any>();
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  async function getData(searchParams: any, page: number) {
    handlers.open();

    const res = await fetch(`/api/products?${searchParams}&page=${page}`, {
      method: "GET",
    });
    const data = await res.json();
    handlers.close();

    setProducts(data);
  }
  async function getDataCategories() {
    const res = await fetch(`/api/product-category`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setCategoryOptions(dataOption);
  }
  useEffect(() => {
    if (openModal) {
      console.log("searchParams", searchParams);
      getData(searchParams.toString(), page);
      getDataCategories();
    }
  }, [openModal, searchParams]);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
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
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên sản phẩm
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
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Số lượng</span>
      ),
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá bán</span>
      ),
      name: "price",
      dataIndex: ["price"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá sale</span>
      ),
      name: "priceSale",
      dataIndex: ["salePrice"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Loại</span>
      ),
      name: "kind",
      dataIndex: ["isProduct"],
      width: "100px",
      render: (record: any, index: number) => {
        const matchedStatus = kindProductOptions.find(
          (item) => item.value === record.toString()
        );
        if (matchedStatus) {
          return (
            <Badge
              radius={0}
              size="lg"
              variant="light"
              color={matchedStatus.color}
              key={index}
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
              radius={0}
              size="lg"
              color={matchedStatus.color}
              key={record}
              variant="light"
            >
              {matchedStatus.label}
            </Badge>
          );
        }
      },
    },
  ];
  const searchData = [
    {
      name: "categoryId",
      placeholder: "Danh mục",
      type: "select",
      data: categoryOptions,
    },
    {
      name: "s",
      placeholder: "Tên sản phẩm",
      type: "input",
    },

    {
      name: "isProduct",
      placeholder: "Loại",
      type: "select",
      data: kindProductOptions,
    },
  ];
  const initialValuesSearch = {
    s: "",
    categoryId: null,
    brandId: null,
    nameId: null,
    yearId: null,
  };

  const [loading, handlers] = useDisclosure();

  console.log(products?.data);
  return (
    <Modal
      title="Chọn sản phẩm"
      opened={openModal}
      onClose={close}
      lockScroll={isMobile}
      // size={"80%"}
      radius={0}
      size="auto"
      fullScreen={isMobile}
    >
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {isMobile ? (
        <>
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
          <ScrollArea h={450}>
            {products?.data?.map((item: any, index: number) => {
              return (
                <ItemProductChoose
                  data={item}
                  key={index}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                />
              );
            })}
          </ScrollArea>
        </>
      ) : (
        <ListPage
          searchForm={
            <SearchForm
              searchData={searchData}
              brandFilter={true}
              initialValues={initialValuesSearch}
            />
          }
          style={{ height: "100%" }}
          baseTable={
            <TableBasic
              loading={loading}
              data={products?.data}
              columns={columns}
              totalPage={products?.totalPage}
              setPage={setPage}
              activePage={page}
              selectRow={true}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          }
        />
      )}
      <Group justify="end" style={{ marginTop: 10 }}>
        <Button
          size="lg"
          radius={0}
          h={{ base: 42, md: 50, lg: 50 }}
          variant="outline"
          key="cancel"
          onClick={close}
          color="red"
          leftSection={<IconBan size={16} />}
        >
          Huỷ bỏ
        </Button>
        <Button
          size="lg"
          radius={0}
          h={{ base: 42, md: 50, lg: 50 }}
          style={{ marginLeft: "12px" }}
          onClick={() => {
            setSelectedProducts(selectedRows);
            close();
          }}
          variant="filled"
          leftSection={<IconChevronRight size={16} />}
        >
          Xác nhận
        </Button>
      </Group>
    </Modal>
  );
}
