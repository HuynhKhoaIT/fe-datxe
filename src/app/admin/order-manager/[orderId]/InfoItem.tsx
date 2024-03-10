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
  useEffect(() => {
    getDataBrands();
    if (dataDetail?.brandId && dataDetail?.nameId) {
      getDataModels(dataDetail?.brandId);
      getDataYearCar(dataDetail?.nameId);
    }
  }, [dataDetail]);

  return (
    <Flex key={index} gap={12} w={"100%"} align={"end"} justify="space-between">
      <Flex gap={12} w={"90%"}>
        <Select
          size="lg"
          radius={0}
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
          size="lg"
          radius={0}
          w={"33%"}
          label="Dòng xe"
          placeholder="Dòng xe"
          data={modelOptions}
          value={dataDetail?.nameId ? dataDetail?.nameId.toString() : null}
          onChange={(value) => {
            getDataYearCar(Number(value));
            handleChangeNameCar(index, Number(value));
          }}
        />
        <MultiSelect
          size="lg"
          radius={0}
          w={"33%"}
          label="Năm sản xuất"
          placeholder="Năm sản xuất"
          data={yearCarOptions}
          value={dataDetail?.yearId ? dataDetail?.yearId.split(",") : []}
          onChange={(value) => {
            handleChangeYearCar(index, value);
          }}
        />
      </Flex>
      <Button
        size="lg"
        radius={0}
        onClick={() => removeCar(index)}
        variant="outline"
        color="red"
      >
        <IconTrash size={16} />
      </Button>
    </Flex>
  );
}
