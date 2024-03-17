import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import React, { Suspense } from "react";
import { getCarSsr } from "@/utils/car";
import { LoadingComponent } from "@/app/components/loading";
import CarForm from "../create/CarForm";

async function getCarData(carId: number) {
  const car = await getCarSsr(carId);
  if (!car) {
    throw new Error("Failed to fetch data");
  }
  return car;
}

export default async function CarSavePage({
  params,
}: {
  params: { slug: number };
}) {
  const carDetail: any = await getCarData(Number(params.slug));
  return (
    <>
      <Box maw={"100%"} mx="auto" className={styles.content}>
        <Typo size="small" type="bold" style={{ color: "var(--theme-color)" }}>
          Cập nhật xe
        </Typo>
        <Space h="md" />
        <Suspense fallback={<LoadingComponent />}>
          <CarForm isEditing={true} dataDetail={carDetail} />
        </Suspense>
      </Box>
    </>
  );
}
