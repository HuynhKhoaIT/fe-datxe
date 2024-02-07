"use client";
import { Button, Select } from "@mantine/core";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { useState } from "react";
const Book = ({ carsOption, provinceData }: any) => {
  const router = useRouter();
  const form = useForm({
    initialValues: {},
    validate: {},
  });
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  async function getDataModels(brandId: number) {
    if (brandId) {
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
  }
  async function getDataYearCar(modelId: number) {
    if (modelId) {
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
  }
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
              data={provinceData}
            />
          </li>
          <li className={styles.item}>
            <Select
              {...form.getInputProps("carBrandId")}
              classNames={{ label: styles.label }}
              variant="unstyled"
              label="Hãng xe"
              placeholder="Chọn hãng xe"
              data={carsOption}
              onChange={(value) => {
                getDataModels(Number(value));
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
              onChange={(value) => {
                getDataYearCar(Number(value));
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
              data={modelOptions}
              onChange={(value) => {
                getDataYearCar(Number(value));
                form.setFieldValue("carNameId", value);
                form.setFieldValue("carYearId", null);
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
