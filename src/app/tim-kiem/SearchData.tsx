// "use client";
import { getProductsSearch } from "@/utils/product";
import { IconBulb } from "@tabler/icons-react";
import { useParams, useSearchParams } from "next/navigation";
import { TableDataProduct } from "../components/pagination-area/pagination-area";
import { Suspense } from "react";
// import { useEffect, useState } from "react";

export default function SearchData() {
  // const searchParams = useSearchParams();
  return (
    <>
      <p style={{ marginBottom: 24 }}>
        <i style={{ marginRight: 5 }}>
          <IconBulb size={20} />
        </i>
        Kết quả tìm kiếm
        <span
          style={{
            color: "var(--theme-color)",
            fontWeight: 600,
            marginLeft: 5,
          }}
        ></span>
      </p>
      <Suspense>
        <TableDataProduct />
      </Suspense>
    </>
  );
}
