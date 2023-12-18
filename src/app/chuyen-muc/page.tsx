import { CategoryItem } from "../components/elements/category/categoryItem";
import { TableDataProduct } from "@/app/components/pagination-area/pagination-area";
import { ICategory } from "@/interfaces/category";
import { getCategories } from "@/utils/category";
import { SideBar } from "../components/elements/shop-sidebar/sideBar";
import { Sort } from "../components/elements/shop-sort/sort";
import Link from "next/link";
import LayoutListProduct from "../components/layout/LayoutListProduct";
import { Breadcrumbs, Anchor } from "@mantine/core";

export default async function Category() {
  const category_list = await getCategories();
  const items = [
    { title: "Trang chủ", href: "/", color: "blue" },
    { title: "Chuyên mục", href: "", color: "black" },
  ].map((item, index) => (
    <Link href={item.href} key={index}>
      <span style={{ color: item.color }}>{item.title}</span>
    </Link>
  ));
  return (
    <LayoutListProduct>
      <div>
        <Breadcrumbs style={{ padding: "16px 20px", position: "absolute" }}>
          {items}
        </Breadcrumbs>

        <div className="shop-item-wrapper pt-60 pb-60">
          <div className="row">
            {category_list?.map((category: ICategory, index) => (
              <div className="col-md-2">
                <CategoryItem key={index} category={category} garageId={0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutListProduct>
  );
}
