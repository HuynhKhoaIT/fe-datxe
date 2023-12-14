import React, { Suspense } from "react";
import { getProductsSearch } from "@/utils/product";
import { TableDataProduct } from "@/app/components/pagination-area/pagination-area";
import Link from "next/link";
import { getCategories } from "@/utils/category";
import { LoadingComponent } from "@/app/components/loading";
import LayoutListProduct from "@/app/components/layout/LayoutListProduct";
import { SideBar } from "@/app/components/shop-sidebar/sideBar";
import { Breadcrumbs, Anchor } from "@mantine/core";

const CategoryItem = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const garageId = searchParams["garage_id"] ?? "0"; // default value is "0"
  let urlProducts = `cat_id=${params.slug}`;
  if (garageId) {
    urlProducts += `&garage_id=${garageId}`;
  }
  let page = 1;
  const productData = await getProductsSearch(urlProducts, page, 8);
  const categories = await getCategories();
  let nameCate;
  categories.forEach((cat) => {
    if (cat.id == parseInt(params.slug)) {
      nameCate = cat?.name;
      return;
    }
  });
  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const items = [
    { title: "Trang chủ", href: "/", color: "blue" },
    { title: "Chuyên mục", href: "./", color: "blue" },
    { title: `${nameCate}`, href: "", color: "black" },
  ].map((item, index) => (
    <Link href={item.href} key={index}>
      <span style={{ color: item.color }}>{item.title}</span>
    </Link>
  ));
  return (
    <LayoutListProduct>
      <div>
        {/* <Breadcrumb
                    separator=">"
                    style={{ padding: '16px 0', position: 'absolute', top: '0', left: 12 }}
                    items={[
                        {
                            title: (
                                <Link href="/" style={{ color: '#1890ff' }}>
                                    Trang chủ
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <Link href="./" style={{ color: '#1890ff' }}>
                                    Chuyên mục
                                </Link>
                            ),
                        },
                        {
                            title: nameCate,
                        },
                    ]}
                /> */}
        <Breadcrumbs style={{ padding: "16px 20px", position: "absolute" }}>
          {items}
        </Breadcrumbs>

        <div className="row  pt-60 pb-60 ">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <Suspense fallback={<LoadingComponent />}>
              <TableDataProduct data={productData} />

              {/* <ProductsListPage /> */}
            </Suspense>
          </div>
        </div>
      </div>
    </LayoutListProduct>
  );
};
export default CategoryItem;
