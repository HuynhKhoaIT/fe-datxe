"use client";
import { useState } from "react";
import RenderContextClient from "../components/elements/RenderContextClient";
import SearchPageMobile from "../layout/mobile/search/searchPage";
import ListSearch from "./ListSearch";
import { useSearch } from "../hooks/search/useSearch";
export const revalidate = 0;
import { kindProduct } from "@/constants/masterData";
import { useCategories } from "../hooks/categories/useCategory";

export default function Search() {
  const [productCount, setProductCount] = useState(5);
  const { data: products, isPending, isFetching } = useSearch(productCount);
  const { data: categories } = useCategories(10);
  return (
    <RenderContextClient
      components={{
        desktop: {
          defaultTheme: ListSearch,
        },
        mobile: {
          defaultTheme: SearchPageMobile,
        },
      }}
      products={products}
      kindProduct={kindProduct}
      productCount={productCount}
      setProductCount={setProductCount}
      isPending={isPending}
      fillter={categories}
    />
  );
}
