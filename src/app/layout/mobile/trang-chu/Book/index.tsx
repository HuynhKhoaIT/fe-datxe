"use client";
import { Button, Select } from "@mantine/core";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  getOptionsBrands,
  getOptionsModels,
  getOptionsProvince,
  getOptionsYearCar,
} from "@/utils/until";
import useFetch from "@/app/hooks/useFetch";
const Book = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {},
    validate: {},
  });
  const { data: provinceOptions, isLoading: isLoading } = useFetch({
    queryKey: ["provinceOptions"],
    queryFn: () => getOptionsProvince(),
  });

  const { data: brandOptions, isLoading: isLoadingBrand } = useFetch({
    queryKey: ["brandOptions"],
    queryFn: () => getOptionsBrands(),
    options: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
    },
  });
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  const handleSubmit = async (values: any) => {
    let queryString = "";
    if (values?.carBrandId) {
      queryString = "brand" + "=" + values?.carBrandId;
    }
    if (values?.carNameId) queryString = "brand" + "=" + values?.carNameId;
    if (values?.carYearId) queryString = "brand" + "=" + values?.carYearId;
    try {
      router.push(`/tim-kiem?${queryString}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <ul className={styles.listItem}>
          <li className={styles.item}>
            <Select
              classNames={{ label: styles.label }}
              label="Vị trí"
              variant="unstyled"
              placeholder="Chọn vị trí"
              data={provinceOptions}
            />
          </li>
          <li className={styles.item}>
            <Select
              {...form.getInputProps("carBrandId")}
              classNames={{ label: styles.label }}
              variant="unstyled"
              label="Hãng xe"
              placeholder="Chọn hãng xe"
              data={brandOptions}
              onChange={async (value) => {
                const optionsData = await getOptionsModels(Number(value));
                setModelOptions(optionsData);
                form.setFieldValue("carBrandId", value);
                form.setFieldValue("carNameId", null);
                form.setFieldValue("carYearId", null);
              }}
            />
          </li>
          <li className={styles.item}>
            <Select
              {...form.getInputProps("carNameId")}
              classNames={{ label: styles.label }}
              variant="unstyled"
              label="Dòng xe"
              placeholder="Chọn dòng xe"
              data={modelOptions}
              onChange={async (value) => {
                const optionsData = await getOptionsYearCar(Number(value));
                setYearCarOptions(optionsData);
                form.setFieldValue("carNameId", value);
                form.setFieldValue("carYearId", null);
              }}
            />
          </li>
          <li className={styles.item}>
            <Select
              {...form.getInputProps("carNameId")}
              classNames={{ label: styles.label }}
              variant="unstyled"
              label="Năm sản xuất"
              placeholder="Chọn năm sản xuất"
              data={yearCarOptions}
              onChange={(value) => {
                form.setFieldValue("carYearId", value);
              }}
            />
          </li>
          <li className={styles.itemBtn}>
            <Button h={47} fullWidth color="var(--yellow-btn)" type="submit">
              Tìm kiếm
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
};
export default Book;
