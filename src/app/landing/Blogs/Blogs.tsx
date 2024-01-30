"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import CardBlog from "./CardBlog";
import blog1 from "@/assets/images/blog1.png";
import blog2 from "@/assets/images/blog2.png";
import blog3 from "@/assets/images/blog3.png";
import blog4 from "@/assets/images/blog4.png";
import { Grid } from "@mantine/core";

export default function Blogs() {
  const blogs = [
    {
      image: blog3.src,
      title: "Dịch vụ sửa xe uy tin tại HCM ",
      view: 123564300,
    },
    {
      image: blog2.src,
      title: "Khi nào nên bảo dưỡng xe",
      view: 123564300,
    },
    {
      image: blog1.src,
      title: "Hành trình mua siêu xe",
      view: 123564300,
    },
    {
      image: blog4.src,
      title: "Lái xe an toàn, các kiến thức cần nắm",
      view: 123564300,
    },
  ];
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
