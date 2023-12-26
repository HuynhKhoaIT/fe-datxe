import React from "react";
import { getCategories } from "@/utils/category";
import ProductListPage from "./ProductListPage";
export default async function CarsPage() {
  const categories: any = await getCategories();

  return <ProductListPage />;
}
