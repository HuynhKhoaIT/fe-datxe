"use client";
import React, { useEffect, useState } from "react";
import { Box, Space } from "@mantine/core";
import ExpertForm from "../create/ExpertForm";
import axios from "axios";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { expertId: number };
}) {
  const [expert, setExpert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/garage/${params?.expertId}`);
        setExpert(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.expertId]);
  return (
    <Box maw={"100%"} mx="auto">
      <ExpertForm isEditing={true} dataDetail={expert} />
    </Box>
  );
}
