import React from "react";
import { Box, Space } from "@mantine/core";
import ExpertForm from "./ExpertForm";
import { getProvinces } from "@/utils/notion";
export default async function CreateCategory() {
  const province: any = await getProvinces();
  const provinceData = province.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  return (
    <Box maw={"100%"} mx="auto">
      <ExpertForm isEditing={false} provinceData={provinceData || []} />
    </Box>
  );
}
