import React from "react";
import { TableDataProduct } from "@/app/components/pagination-area/pagination-area";

export default function CategoryItem({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <TableDataProduct />;
}
