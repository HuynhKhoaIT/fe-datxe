"use client";
import Typo from "@/app/components/elements/Typo";
import { Grid } from "@mantine/core";
import SimpleLineChart from "./SimpleLineChart";
import SimpleBarChart from "./SimpleBarChart";

export default function Chart() {
  return (
    <Grid h={600}>
      <Grid.Col span={6} h={500}>
        <Typo
          size="primary"
          type="bold"
          style={{ color: "var(--theme-color)" }}
        >
          Dòng tiền ra vào
        </Typo>
        <SimpleLineChart />
      </Grid.Col>
      <Grid.Col span={6} h={500}>
        <Typo
          size="primary"
          type="bold"
          style={{ color: "var(--theme-color)" }}
        >
          Doanh thu chi phí
        </Typo>
        <SimpleBarChart />
      </Grid.Col>
    </Grid>
  );
}
