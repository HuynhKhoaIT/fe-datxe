"use client";
import RenderContextClient from "@/app/components/elements/RenderContextClient";
import { useNewsDetail, useNewsList } from "@/app/hooks/news/useNews";
import { useProductRelate } from "@/app/hooks/products/useProducts";
import ProductDetailPageDesktop from "@/app/layout/desktop/san-pham/ProductDetailPage";
import NewDetailPage from "@/app/layout/desktop/tin-tuc/NewsDetailPage";
import ProductDetailPageMobile from "@/app/layout/mobile/san-pham/ProductDetailPage";
export const dynamic = "force-dynamic";

export default function DetailNews({ params }: { params: { slug: string } }) {
  const { data: newsData, isLoading: newsDataLoading } = useNewsDetail(
    params?.slug
  );
  const { data: newsDataList, isLoading: isLoadingNewsList } = useNewsList(10);
  return (
    <RenderContextClient
      components={{
        desktop: {
          defaultTheme: NewDetailPage,
        },
        // mobile: {
        //   defaultTheme: ProductDetailPageMobile,
        // },
      }}
      newsData={newsData}
      newsDataLoading={newsDataLoading}
      newsDataList={newsDataList}
      isLoadingNewsList={isLoadingNewsList}
    />
  );
}
