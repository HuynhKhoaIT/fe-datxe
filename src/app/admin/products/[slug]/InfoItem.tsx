"use client";
import { Button, Flex, MultiSelect, Select } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function InfoItem({
  dataDetail,
  setCar,
  carData,
  index,
  handleChangeBrand,
  handleChangeNameCar,
  handleChangeYearCar,
}: any) {
  const [brandOptions, setBrandOptions] = useState<any>([]);
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const removeCar = (index: number) => {
    const newCar = [...carData];
    newCar.splice(index, 1);
    setCar(newCar);
  };

  async function getDataBrands() {
    const res = await fetch(`/api/car-model`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setBrandOptions(dataOption);
  }
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
    getDataBrands();
  }, []);

  return (
    <Flex key={index} gap={12} w={"100%"} align={"end"} justify="space-between">
      <Flex gap={12} w={"90%"}>
        <Select
          w={"33%"}
          label="Hãng xe"
          placeholder="Hãng xe"
          data={brandOptions}
          value={dataDetail?.brandId.toString()}
          onChange={(value) => {
            getDataModels(Number(value));
            handleChangeBrand(index, Number(value));
          }}
        />
        <Select
          w={"33%"}
          label="Dòng xe"
          placeholder="Dòng xe"
          data={modelOptions}
          value={dataDetail?.nameId.toString()}
          onChange={(value) => {
            getDataYearCar(Number(value));
            handleChangeNameCar(index, Number(value));
          }}
        />
        <MultiSelect
          w={"33%"}
          label="Năm sản xuất"
          placeholder="Năm sản xuất"
          data={yearCarOptions}
          defaultValue={dataDetail?.yearId ? dataDetail?.yearId.split(",") : []}
          onChange={(value) => {
            handleChangeYearCar(index, value);
          }}
        />
      </Flex>
      <Button onClick={() => removeCar(index)} variant="outline" color="red">
        <IconTrash size={16} />
      </Button>
    </Flex>
  );
}
