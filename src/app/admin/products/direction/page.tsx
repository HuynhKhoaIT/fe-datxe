import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import React from "react";
export const dynamic = "force-dynamic";
import { getCategories } from "@/app/libs/prisma/category";
import ProductSave from "../create/ProductSave";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
async function getDataCategories() {
  const categories = await getCategories({});
  if (!categories) {
    throw new Error("Failed to fetch data");
  }

  return categories;
}
export default async function ProductDirection() {
  const categories = await getDataCategories();
  const session = await getServerSession(authOptions);

  const dataOptions = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  return (
    <Box maw={"100%"} mx="auto">
      <ProductSave
        isDirection={true}
        categoryOptions={dataOptions}
        user={session?.user}
      />
    </Box>
  );
}
