"use client";
import { Box } from "@mantine/core";
import NewsForm from "../create/NewsForm";
import { useNewsDetail } from "../../hooks/news/useNews";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { blogId: string };
}) {
  const { data: news, isLoading: isLoadingNews } = useNewsDetail(
    params?.blogId
  );

  return (
    <Box maw={"100%"} mx="auto">
      <NewsForm
        isLoading={isLoadingNews}
        isEditing={true}
        dataDetail={news?.data || []}
      />
    </Box>
  );
}
