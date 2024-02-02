"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import CardBlog from "./CardBlog";
import { Grid } from "@mantine/core";

export default function Blogs({ blogs }: any) {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Chia sẽ kinh nghiệm"
      linkToList={"/blog"}
      id="products"
    >
      <Grid>
        <Grid.Col h={533} span={6}>
          <CardBlog data={blogs[0]} />
        </Grid.Col>
        <Grid.Col h={533} span={6}>
          <Grid h={265}>
            <Grid.Col span={6} h={265}>
              <CardBlog data={blogs[1]} />
            </Grid.Col>
            <Grid.Col span={6} h={265}>
              <CardBlog data={blogs[2]} />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={12} h={265}>
              <CardBlog data={blogs[3]} />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </OverviewPanel>
  );
}
