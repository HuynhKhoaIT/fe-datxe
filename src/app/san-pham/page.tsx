import RenderContext from "@/app/components/elements/RenderContext";
import { apiUrl } from "@/constants";
import ProductsListPageDesktop from "../layout/desktop/san-pham/ProductsListPage";
import ProductsListPageMobile from "../layout/mobile/san-pham/ProductsListPage";

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
export default async function Products() {
  const products: any = await getProducts();

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
    />
  );
}
