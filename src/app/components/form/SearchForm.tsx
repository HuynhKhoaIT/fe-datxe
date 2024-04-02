"use client";
import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Collapse,
  Flex,
  Group,
  Input,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronUp,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
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
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
export default function SearchForm({
  searchData,
  brandFilter = false,
  initialValues,
}: any) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const router = useRouter();
  const pathname = usePathname();
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [opened, { toggle }] = useDisclosure(false);

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
        {isMobile && (
          <>
            {searchData?.[0]?.type === FieldTypes.STRING ? (
              <Input
                size="lg"
                radius={0}
                w={{ base: "100%", sm: "25%", md: "25%", lg: "25%" }}
                {...form.getInputProps(searchData?.[0].name)}
                placeholder={searchData?.[0]?.placeholder}
              />
            ) : searchData?.[0]?.type === FieldTypes.SELECT ? (
              <Select
                size="lg"
                radius={0}
                w={{ base: "100%", sm: "25%", md: "25%", lg: "25%" }}
                {...form.getInputProps(searchData?.[0].name)}
                data={searchData?.[0]?.data}
                placeholder={searchData?.[0]?.placeholder}
              />
            ) : (
              <AutocompleteClearable
                getOptionData={searchData?.[0].getOptionsData}
                form={form}
                name={searchData?.[0].name}
                w={{ base: "100%", sm: "25%", md: "25%", lg: "25%" }}
                placeholder={searchData?.[0].placeholder}
                isCamera={searchData?.[0].isCamera}
              />
            )}
          </>
        )}
        <Collapse
          mt={{ base: 10, md: 0, lg: 0 }}
          ml={{ base: 0, md: 10, lg: 10 }}
          in={isMobile ? opened : true}
        >
          <Flex gap={10} style={{ flexWrap: "wrap" }}>
            {searchData?.map((item: any, index: number) => {
              if (index == 0 && isMobile) return;
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
                  w={{ base: "100%", sm: "15%", md: "15%", lg: "15%" }}
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
                  w={{ base: "100%", sm: "15%", md: "15%", lg: "15%" }}
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
                  w={{ base: "100%", sm: "15%", md: "15%", lg: "15%" }}
                  {...form.getInputProps("yearId")}
                  data={yearCarOptions}
                  onChange={(value) => {
                    form.setFieldValue("yearId", String(value));
                  }}
                  placeholder={"Năm sản xuất"}
                />
              </>
            )}
            {!isMobile && (
              <>
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
              </>
            )}
          </Flex>
        </Collapse>
        {isMobile && (
          <Group justify="space-between" mt={10}>
            <Group>
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
            </Group>
            {searchData?.length > 1 ? (
              <ActionIcon
                size="lg"
                h={{ base: 42, md: 50, lg: 50 }}
                onClick={toggle}
              >
                {opened ? <IconChevronUp /> : <IconChevronDown />}
              </ActionIcon>
            ) : (
              brandFilter && (
                <ActionIcon
                  size="lg"
                  h={{ base: 42, md: 50, lg: 50 }}
                  onClick={toggle}
                >
                  {opened ? <IconChevronUp /> : <IconChevronDown />}
                </ActionIcon>
              )
            )}
          </Group>
        )}
      </form>
    </Box>
  );
}
