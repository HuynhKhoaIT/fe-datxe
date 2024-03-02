import RenderContext from "@/app/components/elements/RenderContext";
import { apiUrl } from "@/constants";
import ProductsListPageDesktop from "../layout/desktop/san-pham/ProductsListPage";
import ProductsListPageMobile from "../layout/mobile/san-pham/ProductsListPage";
import { getCategories } from "../libs/prisma/category";

async function getProducts() {
  const res = await fetch(`${apiUrl}/api/products?isProduct=1&limit=8`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();
  return data;
}
async function getCategoriesData() {
  const categories  = await getCategories({});
  if (!categories) {
    throw new Error("Failed to fetch data");
  }
  return categories;
}
export default async function Products() {
  const products: any = await getProducts();
  const categroies = await getCategoriesData();

  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: ProductsListPageDesktop,
        },
        mobile: {
          defaultTheme: ProductsListPageMobile,
        },
      }}
      dataSource={products}
      categroies={categroies}
    />
  );
}
