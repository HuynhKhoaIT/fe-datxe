"use client";
import { Box } from "@mantine/core";
import ExpertForm from "../create/ExpertForm";
import { useExpertDetail } from "../../hooks/expert/useExpert";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { expertId: string };
}) {
  const { data: expert, isLoading, isPending } = useExpertDetail(
    params.expertId
  );

  return (
    <Box maw={"100%"} mx="auto">
      <ExpertForm isLoading={isLoading} isEditing={true} dataDetail={expert} />
    </Box>
  );
}
