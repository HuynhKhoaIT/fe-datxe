import React from "react";
import ExpertForm from "./ExpertForm";
import { getProvinces } from "@/utils/notion";
export default async function CreateCategory() {
  const province: any = await getProvinces();
  const provinceData = province.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  return <ExpertForm isEditing={false} provinceData={provinceData || []} />;
}
