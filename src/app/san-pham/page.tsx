import RenderContext from "@/app/components/elements/RenderContext";
import { apiUrl } from "@/constants";
import ProductsListPageDesktop from "../layout/desktop/san-pham/ProductsListPage";
import ProductsListPageMobile from "../layout/mobile/san-pham/ProductsListPage";
import { getCategories } from "../libs/prisma/category";
import { getProducts } from "../libs/prisma/product";

export default async function Products() {
  const products = await getProducts({ garageId: 0 });
  const categroies = await getCategories({});

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
