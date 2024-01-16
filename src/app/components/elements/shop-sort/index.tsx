"use client";
import React from "react";
import { Group, Select } from "@mantine/core";
import styles from "./index.module.scss";
import Typo from "../Typo";
import { useRouter, useSearchParams } from "next/navigation";
export function Sort({ lengthData }: { lengthData: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Group justify="space-between" w={"100%"}>
      <Typo size="sub" type="semi-bold" style={{ color: "var(--theme-color)" }}>
        Hiển thị {lengthData} sản phẩm
      </Typo>
      <Select
        placeholder="Sắp xếp theo mặc định"
        data={[
          { value: "0", label: "Sắp xếp theo mặc định" },
          { value: "1", label: "Sắp xếp theo nổi bật" },
          { value: "2", label: "Sắp xếp theo mới nhất" },
          { value: "3", label: "Sắp xếp theo giá thấp" },
          { value: "4", label: "Sắp xếp theo giá cao" },
        ]}
        onChange={(value) => {
          const params = new URLSearchParams(searchParams);
          if (value) {
            if (params.has("filter")) {
              params.set("filter", value);
            } else {
              params.append("filter", value);
            }
          } else {
            params?.delete("filter");
          }
          router.push(`?${params.toString()}`);
        }}
      />
    </Group>
  );
}
