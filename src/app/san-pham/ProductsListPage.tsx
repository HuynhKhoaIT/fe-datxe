"use client";

import React, { useEffect, useState } from "react";
import { getProducts, getProductsSearch } from "@/utils/product";
import { TableDataProduct } from "../components/pagination-area/pagination-area";
import { useSearchParams } from "next/navigation";
import { IProduct } from "@/interfaces/product";

export default function ProductsListPage() {
  const searchParams = useSearchParams();
  const catID = searchParams.get("cat_id");
  const [productData, setProductData] = useState<IProduct[]>([]);
  useEffect(() => {
    async function fetchFilterProducts() {
      if (catID) {
        let page = 1;
        const newProductData = await getProductsSearch(`cat_id=${catID}`, page);
        setProductData(newProductData);
      }
    }
    fetchFilterProducts();
  }, [catID]);
  useEffect(() => {
    async function fetchProducts() {
      const product_data = await getProducts();
      setProductData(product_data);
    }
    fetchProducts();
  }, []);
  return <TableDataProduct data={productData} />;
}
