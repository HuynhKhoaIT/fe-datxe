"use client";
import { getCategories } from "@/utils/category";
import { Button, Card, Flex, MultiSelect, Select } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
export default function InfoCar({ carData, setCar }: any) {
  const addCar = () => {
    if (carData.length < 9) {
      setCar([...carData, { carData: "" }]);
    }
  };

  const removeCar = (index: number) => {
    const newCar = [...carData];
    newCar.splice(index, 1);
    setCar(newCar);
  };
  return (
    <Card shadow="sm" padding="lg" withBorder title="Áp dụng dòng xe" mt={24}>
      {carData.map((item: any, index: number) => (
        <Flex gap={12} w={"100%"} align={"end"} justify="space-between">
          <Flex gap={12} w={"90%"}>
            <Select
              w={"33%"}
              label="Hãng xe"
              placeholder="Hãng xe"
              data={["React", "Angular", "Vue", "Svelte"]}
            />
            <Select
              w={"33%"}
              label="Dòng xe"
              placeholder="Dòng xe"
              data={["React", "Angular", "Vue", "Svelte"]}
            />
            <MultiSelect
              w={"33%"}
              label="Năm sản xuất"
              placeholder="Năm sản xuất"
              data={["2023", "2022", "2021", "2020"]}
            />
          </Flex>
          <Button
            onClick={() => removeCar(index)}
            variant="outline"
            color="red"
          >
            <IconTrash size={16} />
          </Button>
        </Flex>
      ))}
      <Flex justify="end" mt={12}>
        <Button onClick={addCar} size="md">
          <IconPlus size={16} />
        </Button>
      </Flex>
    </Card>
  );
}
