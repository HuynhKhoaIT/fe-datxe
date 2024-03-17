"use client";
import { Box, Button, Flex, Input, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Typo from "../elements/Typo";
import { IconFilter } from "@tabler/icons-react";
import styles from "./SearchForm.module.scss";
import {
  getOptionsBrands,
  getOptionsModels,
  getOptionsYearCar,
} from "@/utils/util";
export default function SearchForm({
  searchData,
  brandFilter = false,
  initialValues,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [brandOptions, setBrandOptions] = useState<any>([]);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const brands = await getOptionsBrands();
      setBrandOptions(brands);
    };
    if (brandFilter) {
      fetchData();
    }
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
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };
  return (
    <Box className={styles.boxSearch}>
      <div style={{ borderBottom: "1px solid #eeeeee" }}>
        <Typo size="18px" type="bold" className={styles.titleSearch}>
          <IconFilter size={22} />
          Tìm kiếm
        </Typo>
      </div>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        onReset={form.onReset}
        className={styles.formSearch}
      >
        <Flex gap={10} style={{ flexWrap: "wrap" }}>
          {searchData?.map((item: any, index: number) => {
            if (item?.type === "input") {
              return (
                <Input
                  size="lg"
                  radius={0}
                  w={{ base: "100%", sm: "25%", md: "25%", lg: "25%" }}
                  key={index}
                  {...form.getInputProps(item.name)}
                  placeholder={item?.placeholder}
                />
              );
            } else if (item?.type === "select") {
              return (
                <Select
                  size="lg"
                  radius={0}
                  w={{ base: "100%", sm: "25%", md: "25%", lg: "25%" }}
                  key={index}
                  {...form.getInputProps(item.name)}
                  data={item?.data}
                  placeholder={item?.placeholder}
                />
              );
            }
          })}
          {brandFilter && (
            <>
              <Select
                size="lg"
                radius={0}
                w={{ base: "100%", sm: "25%", md: "25%", lg: "25%" }}
                {...form.getInputProps("brandId")}
                data={brandOptions}
                placeholder={"Hãng xe"}
                onChange={async (value) => {
                  const optionsData = await getOptionsModels(Number(value));
                  setModelOptions(optionsData);
                  form.setFieldValue("brandId", String(value));
                  form.setFieldValue("nameId", null);
                  form.setFieldValue("yearId", null);
                }}
              />
              <Select
                size="lg"
                radius={0}
                w={{ base: "100%", sm: "25%", md: "25%", lg: "25%" }}
                {...form.getInputProps("nameId")}
                data={modelOptions}
                onChange={async (value) => {
                  const optionsData = await getOptionsYearCar(Number(value));
                  setYearCarOptions(optionsData);
                  form.setFieldValue("nameId", String(value));
                  form.setFieldValue("yearId", null);
                }}
                placeholder={"Dòng xe"}
              />
              <Select
                size="lg"
                radius={0}
                w={{ base: "100%", sm: "25%", md: "25%", lg: "25%" }}
                {...form.getInputProps("yearId")}
                data={yearCarOptions}
                onChange={(value) => {
                  form.setFieldValue("yearId", String(value));
                }}
                placeholder={"Năm sản xuất"}
              />
            </>
          )}
          <Button
            size="lg"
            h={{ base: 42, md: 50, lg: 50 }}
            radius={0}
            leftSection={<IconSearch size={18} />}
            type="submit"
          >
            Tìm kiếm
          </Button>
          <Button
            size="lg"
            h={{ base: 42, md: 50, lg: 50 }}
            radius={0}
            leftSection={<IconTrash size={18} />}
            variant="outline"
            color="#f72b50"
            bg="#fee6ea"
            style={{ border: "0" }}
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
