"use client";
import { getCategories } from "@/utils/category";
import { Button, Card, Flex, MultiSelect, Select } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import InfoItem from "./InfoItem";
export default function InfoCar({
  carData,
  setCar,
  handleChangeBrand,
  handleChangeNameCar,
  handleChangeYearCar,
}: any) {
  const addCar = () => {
    if (carData.length < 9) {
      setCar([...carData, { brandId: "", nameId: "", yearId: "" }]);
    }
  };

  console.log("carData", carData);
  return (
    <Card shadow="sm" padding="lg" withBorder title="Áp dụng dòng xe" mt={24}>
      {carData.map((item: any, index: number) => (
        <InfoItem
          dataDetail={item}
          index={index}
          setCar={setCar}
          carData={carData}
          handleChangeBrand={handleChangeBrand}
          handleChangeNameCar={handleChangeNameCar}
          handleChangeYearCar={handleChangeYearCar}
        />
      ))}
      <Flex justify="end" mt={12}>
        <Button onClick={addCar} size="md">
          <IconPlus size={16} />
        </Button>
      </Flex>
    </Card>
  );
}
