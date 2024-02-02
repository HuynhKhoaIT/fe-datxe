"use client";

import SlickCarousel from "@/app/components/common/SlickCarousell";
import ProductItem2 from "@/app/components/elements/product/ProductItem2";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import { IProduct } from "@/interfaces/product";

const ViewedProducts = ({ viewedProducts }: any) => {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Danh sách đã xem"
      linkToList={"/san-pham"}
      id="viewedProducts"
    >
      <SlickCarousel column={4} gap={8} dots={true}>
        {viewedProducts?.map((product: IProduct, index: number) => (
          <ProductItem2 product={product} key={index} />
        ))}
      </SlickCarousel>
    </OverviewPanel>
  );
};
export default ViewedProducts;
