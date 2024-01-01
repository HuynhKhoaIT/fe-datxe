import { getProductByGar } from "@/utils/product";
import ProductListPage from "./ProductListPage";
import prisma from "@/app/libs/prismadb";
// export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import { getProducts } from "@/app/libs/prisma";
async function getData() {
  const { products } = await getProducts();
  if (!products) {
    throw new Error("Failed to fetch data");
  }
  return products;
}
export default async function ProductsManaga() {
  let garage_id: string = "9";
  const products = await getData();
  const productsGara = await getProductByGar(garage_id.toString(), 20);
  return <ProductListPage dataSource={products} productsGara={productsGara} />;
}
