"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import { Grid } from "@mantine/core";
import CardBlog from "./CardBlog";

export default function Blogs({ blogs }: any) {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Chia sẽ kinh nghiệm"
      linkToList={"/blog"}
      id="products"
    >
      <Grid>
        <Grid.Col h={287} span={12}>
          <CardBlog data={blogs[0]} />
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid h={139}>
            <Grid.Col span={6} h={139}>
              <CardBlog data={blogs[1]} />
            </Grid.Col>
            <Grid.Col span={6} h={139}>
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
