"use client";
import { Box, Button, Flex, Input, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchForm({
  searchData,
  brandFilter = false,
  initialValues,
}: any) {
  const router = useRouter();
  const [brandOptions, setBrandOptions] = useState<any>([]);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const getBrands = async () => {
    const res = await fetch("/api/car-model", { method: "GET" });
    const data = await res.json();
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setBrandOptions(dataOption);
  };
  async function getDataModels(brandId: number) {
    console.log("brandId", brandId);
    const res = await fetch(`/api/car-model/${brandId}`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setModelOptions(dataOption);
  }
  async function getDataYearCar(modelId: number) {
    const res = await fetch(`/api/car-model/${modelId}`, {
      method: "GET",
    });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setYearCarOptions(dataOption);
  }
  useEffect(() => {
    getBrands();
  }, [brandFilter]);
  const form = useForm({
    initialValues: initialValues,
    validate: {},
  });
  const handleSubmit = (values: any) => {
    if (values?.brandId) {
      values.brand = values?.brandId;
      // values.brandId = null;
    }
    if (values?.nameId) {
      values.brand = values?.nameId;
      // values.nameId = null;
    }
    if (values?.yearId) {
      values.brand = values?.yearId;
      // values.yearId = null;
    }
    const queryString = Object.keys(values)
      .filter((key) => values[key] !== null)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`
      )
      .join("&");
    console.log(values);
    router.push(`/admin/products?${queryString}`);
  };
  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        onReset={form.onReset}
      >
        <Flex gap={10}>
          {searchData?.map((item: any, index: number) => {
            if (item?.type === "input") {
              return (
                <Input
                  key={index}
                  {...form.getInputProps(item.name)}
                  placeholder={item?.placeholder}
                />
              );
            } else if (item?.type === "select") {
              return (
                <Select
                  key={index}
                  {...form.getInputProps(item.name)}
                  data={item?.data}
                  placeholder={item?.placeholder}
                />
              );
            }
          })}
          {brandFilter && (
            <Flex gap={10}>
              <Select
                {...form.getInputProps("brandId")}
                data={brandOptions}
                placeholder={"Hãng xe"}
                onChange={(value) => {
                  getDataModels(Number(value));
                  form.setFieldValue("brandId", String(value));
                  form.setFieldValue("nameId", null);
                  form.setFieldValue("yearId", null);
                }}
              />
              <Select
                {...form.getInputProps("nameId")}
                data={modelOptions}
                onChange={(value) => {
                  getDataYearCar(Number(value));
                  form.setFieldValue("nameId", String(value));
                  form.setFieldValue("yearId", null);
                }}
                placeholder={"Dòng xe"}
              />
              <Select
                {...form.getInputProps("yearId")}
                data={yearCarOptions}
                onChange={(value) => {
                  form.setFieldValue("yearId", String(value));
                }}
                placeholder={"Năm sản xuất"}
              />
            </Flex>
          )}
          <Button leftSection={<IconSearch size={14} />} type="submit">
            Tìm kiếm
          </Button>
          <Button
            leftSection={<IconTrash size={14} />}
            variant="outline"
            color="gray"
            onClick={() => {
              form.reset();
            }}
            type="submit"
          >
            Xoá
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
