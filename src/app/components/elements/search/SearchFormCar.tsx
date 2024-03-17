import { Button, Grid, Select } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { getBrands, getModels, getYears } from "@/utils/branch";
import { useRouter } from "next/navigation";
import { getOptionsModels, getOptionsYearCar } from "@/utils/util";
export default function SearchFormCar({ brandsOption }: any) {
  const router = useRouter();
  const [opened, handlers] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<any>();
  const [yearCar, setYearCar] = useState<any>();

  const form = useForm({
    initialValues: {},
    validate: {},
  });

  const handleSubmit = async (values: any) => {
    let queryString = "";
    if (values?.brand_id) {
      queryString = "brand" + "=" + values?.brand_id;
    }
    if (values?.car_name_id) queryString = "brand" + "=" + values?.car_name_id;
    if (values?.year_id) queryString = "brand" + "=" + values?.year_id;
    try {
      router.push(`/tim-kiem?${queryString}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Grid gutter={5}>
        <Grid.Col span={3.5}>
          <Select
            size="lg"
            radius={0}
            {...form.getInputProps("brand_id")}
            checkIconPosition="right"
            placeholder="Hãng xe"
            data={brandsOption}
            clearable
            onChange={async (value) => {
              const optionsData = await getOptionsModels(Number(value));
              setModels(optionsData);
              form.setFieldValue("car_name_id", null);
              form.setFieldValue("brand_id", Number(value));
              form.setFieldValue("year_id", null);
            }}
          />
        </Grid.Col>
        <Grid.Col span={3.5}>
          <Select
            size="lg"
            radius={0}
            {...form.getInputProps("car_name_id")}
            checkIconPosition="right"
            placeholder="Dòng xe"
            data={models}
            clearable
            onChange={async (value) => {
              const optionsData = await getOptionsYearCar(Number(value));
              setYearCar(optionsData);
              form.setFieldValue("car_name_id", Number(value));
              form.setFieldValue("year_id", null);
            }}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Select
            size="lg"
            radius={0}
            {...form.getInputProps("year_id")}
            checkIconPosition="right"
            placeholder="Năm sản xuất"
            clearable
            data={yearCar}
            onChange={(value) => {
              form.setFieldValue("year_id", Number(value));
            }}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Button
            size="lg"
            radius={0}
            loading={opened}
            variant="filled"
            type="submit"
            style={{
              background: "var(--theme-color)",
            }}
          >
            Tìm
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}
