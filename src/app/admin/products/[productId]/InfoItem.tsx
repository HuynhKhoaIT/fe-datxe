"use client";
import useFetch from "@/app/hooks/useFetch";
import {
  getOptionsBrands,
  getOptionsModels,
  getOptionsYearCar,
} from "@/utils/until";
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
  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);

  const removeCar = (index: number) => {
    const newCar = [...carData];
    newCar.splice(index, 1);
    setCar(newCar);
  };
  const { data: brandOptions, isLoading: isLoadingBrand } = useFetch({
    queryKey: ["brandOptions"],
    queryFn: () => getOptionsBrands(),
    options: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
    },
  });
  useEffect(() => {
    const fetchModels = async (data: any) => {
      const models = await getOptionsModels(data);
      setModelOptions(models);
    };
    const fetchYearCars = async (data: any) => {
      const yearCars = await getOptionsYearCar(data);
      setYearCarOptions(yearCars);
    };
    if (dataDetail?.brandId && dataDetail?.nameId) {
      fetchModels(dataDetail?.brandId);
      fetchYearCars(dataDetail?.nameId);
    }
  }, [dataDetail]);

  return (
    <Flex key={index} gap={12} w={"100%"} align={"end"} justify="space-between">
      <Flex gap={12} w={"90%"} style={{ flexWrap: "wrap" }}>
        <Select
          size="lg"
          radius={0}
          w={{ base: "100%", md: "30%", lg: "30%" }}
          label="Hãng xe"
          placeholder="Hãng xe"
          data={brandOptions}
          value={dataDetail?.brandId.toString()}
          onChange={async (value) => {
            const optionsData = await getOptionsModels(Number(value));
            setModelOptions(optionsData);
            handleChangeBrand(index, Number(value));
          }}
        />
        <Select
          size="lg"
          radius={0}
          w={{ base: "100%", md: "30%", lg: "30%" }}
          label="Dòng xe"
          placeholder="Dòng xe"
          data={modelOptions}
          value={dataDetail?.nameId ? dataDetail?.nameId.toString() : null}
          onChange={async (value) => {
            const optionsData = await getOptionsYearCar(Number(value));
            setYearCarOptions(optionsData);
            handleChangeNameCar(index, Number(value));
          }}
        />
        <MultiSelect
          size="lg"
          radius={0}
          w={{ base: "100%", md: "30%", lg: "30%" }}
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
