import React from "react";
import BlogForm from "./BlogForm";
import { getProvinces } from "@/utils/notion";
export default async function CreateCategory() {
  const province: any = await getProvinces();
  const provinceData = province.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  return <BlogForm isEditing={false} provinceData={provinceData || []} />;
}
