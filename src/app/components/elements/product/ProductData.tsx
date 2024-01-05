import { IProduct } from "@/interfaces/product";
import { Grid } from "@mantine/core";
import ProductItem from "./ProductItem";
export default function ProductData({
  product_data,
}: {
  product_data: IProduct[];
}) {
  return (
    <Grid gutter={16}>
      {product_data?.map((product: IProduct, index) => (
        <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4, lg: 3 }} key={index}>
          <ProductItem product={product} key={index} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
