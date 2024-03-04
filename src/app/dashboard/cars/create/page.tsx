import { getBrands } from "@/utils/branch";
import CarForm from "./CarForm";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import Link from "next/link";
import { Suspense } from "react";
import { LoadingComponent } from "@/app/components/loading";
export default async function CreateCar() {
  const data = await getBrands();
  const brandOptions = data?.map((brand) => ({
    value: brand.id?.toString() || "",
    label: brand.name || "",
  }));
  return (
    <Box maw={"100%"} mx="auto" className={styles.content}>
      <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
        Thêm xe
      </Typo>
      <Space h="md" />
      <Suspense fallback={<LoadingComponent />}>
        <CarForm brandOptions={brandOptions} />
      </Suspense>
    </Box>
  );
}
