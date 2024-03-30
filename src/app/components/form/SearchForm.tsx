"use client";
import { Autocomplete, Box, Button, Flex, Input, Select } from "@mantine/core";
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
} from "@/utils/until";
import useFetch from "@/app/hooks/useFetch";
import AutocompleteField from "./AutoCompleteField";
import { FieldTypes } from "@/constants/masterData";
import { AutocompleteClearable } from "./AutoCompleteClear";
export default function SearchForm({
  searchData,
  brandFilter = false,
  initialValues,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  if (brandFilter) {
    var { data: brandOptions } = useFetch({
      queryKey: ["brandOptions"],
      queryFn: () => getOptionsBrands(),
      options: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        refetchInterval: false,
      },
    });
  }

  const form = useForm({
    initialValues: initialValues,
    validate: {},
  });
  console.log(form.values);
  const handleSubmit = (values: any) => {
    if (values?.carBrandId) {
      values.carBrandId = values?.carBrandId;
      // values.carBrandId = null;
    }
    if (values?.carNameId) {
      values.carNameId = values?.carNameId;
      // values.nameId = null;
    }
    if (values?.carYearId) {
      values.carYearId = values?.carYearId;
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
            if (item?.type === FieldTypes.STRING) {
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
            } else if (item?.type === FieldTypes.SELECT) {
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
            } else if (item.type === FieldTypes.AUTOCOMPLETE) {
              return (
                <AutocompleteClearable
                  getOptionData={item.getOptionsData}
                  form={form}
                  name={item.name}
                  w={{ base: "100%", sm: "25%", md: "25%", lg: "25%" }}
                  placeholder={item.placeholder}
                  isCamera={item.isCamera}
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
