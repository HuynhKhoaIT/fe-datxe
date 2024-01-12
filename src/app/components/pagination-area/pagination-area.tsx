"use client";
import React, { Suspense, useEffect, useState } from "react";
import ProductData from "../elements/product/ProductData";
import { Sort } from "../elements/shop-sort";
import { LoadingComponent } from "../loading";
import { useSearchParams } from "next/navigation";
import { getProductsSearch } from "@/utils/product";
const TableDataProduct = () => {
  const searchParams = useSearchParams();
  const [loadMore, setLoadMore] = useState(false);
  const [activePage, setPage] = useState(1);
  const [productData, setProductData] = useState<any>();

  useEffect(() => {
    const fetchProducts = async (activePage: any, params: string) => {
      let limit = 8;
      const res = await fetch(`/api/products?${params}&page=${activePage}`, {
        method: "GET",
      });
      const data = await res.json();

      const newProductData = await getProductsSearch(params, activePage, limit);
      if (activePage !== 1) {
        let array = [...productData, ...data];
        console.log(array);
        console.log(data);

        setProductData(array);
      } else {
        setProductData(data);
      }
    };
    fetchProducts(activePage, searchParams.toString());
  }, [searchParams, activePage]);
  return (
    <div>
      {productData?.length > 8 ? (
        <Sort lengthData={productData?.length ?? 0} />
      ) : (
        <h5>Hiển thị {productData?.length} sản phẩm</h5>
      )}
      <div className="shop-item-wrapper">
        <div className="row">
          <ProductData product_data={productData} />
        </div>
      </div>
      {!loadMore && (
        <div className="text-center mt-4">
          <button
            onClick={() => {
              // fetchProducts(activePage + 1);
              setPage((prev) => prev + 1);
            }}
            className="theme-btn"
          >
            Xem Thêm
          </button>
        </div>
      )}
    </div>
  );
};

export { TableDataProduct };
