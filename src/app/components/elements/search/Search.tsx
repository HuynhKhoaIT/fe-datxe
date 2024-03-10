"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input, CloseButton, Grid, Button, Select } from "@mantine/core";
import { getBrands, getModels } from "@/utils/branch";
import { IBrand } from "@/interfaces/brand";
import { YearPickerInput } from "@mantine/dates";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import SearchFormName from "./SearchFormName";
import SearchFormCar from "./SearchFormCar";
function SearchForm() {
  const [brandsData, setBrandsData] = useState();
  async function getBrandsData() {
    const res = await fetch(`/api/car-model`, {
      method: "GET",
    });
    const data = await res.json();
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    setBrandsData(dataOption);
  }
  useEffect(() => {
    getBrandsData();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Grid>
        <Grid.Col span={5}>
          <SearchFormName />
        </Grid.Col>
        <Grid.Col span={5.5} style={{ display: "flex", alignItems: "end" }}>
          <SearchFormCar brandsOption={brandsData} />
        </Grid.Col>
        <Grid.Col span={1.5} style={{ display: "flex", alignItems: "end" }}>
          <Link href="/dat-lich">
            <Button
              size="md"
              // loading={loading}
              variant="filled"
              style={{
                background: "var(--theme-color)",
              }}
            >
              Đặt lịch
            </Button>
          </Link>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default SearchForm;
