"use client";
import RenderContextClient from "../components/elements/RenderContextClient";
import { useNewsList } from "../hooks/news/useNews";
import NewsListPage from "../layout/desktop/tin-tuc/NewsListPage";

export default function News() {
  const { data: newsData, isLoading, isFetching } = useNewsList(10);
  return (
    <RenderContextClient
      components={{
        desktop: {
          defaultTheme: NewsListPage,
        },
        // mobile: {
        //   defaultTheme: ProductsListPageMobile,
        // },
      }}
      newsData={newsData}
    />
  );
}
