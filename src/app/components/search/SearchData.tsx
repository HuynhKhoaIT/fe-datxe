"use client";
import { IProduct } from "@/interfaces/product";
import { getProductsSearch } from "@/utils/product";
import { useEffect, useState } from "react";
import { ProductItem } from "../product/productItem";
import { TableDataProduct } from "../pagination-area/pagination-area";
import { IconBulb } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Button, LoadingOverlay, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
const SearchData = () => {
  const [visible, handlers] = useDisclosure(false);

  const [activePage, setPage] = useState(1);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  const [productData, setProductData] = useState<any>([]);
  console.log("productData", params?.toString());
  const fetchProducts = async (activePage: any) => {
    try {
      let limit = 8;
      const newProductData = await getProductsSearch(
        params?.toString(),
        activePage,
        limit
      );
      if (activePage !== 1) setProductData([...productData, ...newProductData]);
      else setProductData(newProductData);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
    }
  };
  useEffect(() => {
    fetchProducts(1);
  }, [params?.toString()]);

  return (
    <>
      <p style={{ marginBottom: 24 }}>
        <i style={{ marginRight: 5 }}>
          <IconBulb size={20} />
        </i>
        Kết quả tìm kiếm cho từ khoá
        <span
          style={{
            color: "var(--theme-color)",
            fontWeight: 600,
            marginLeft: 5,
          }}
        >
          {/* {search} */}
        </span>
      </p>
      <TableDataProduct data={productData} />
      <div className="text-center mt-4">
        <button
          onClick={() => {
            fetchProducts(activePage + 1);
            setPage((prev) => prev + 1);
          }}
          className="theme-btn"
        >
          Xem Thêm
        </button>
      </div>
    </>
  );
};

export default SearchData;
