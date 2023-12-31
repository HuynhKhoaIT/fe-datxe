import { ReactNode, Suspense } from "react";
import { SideBarFilter } from "../components/elements/shop-sidebar/sideBar";
import Link from "next/link";
import { Breadcrumbs, Anchor } from "@mantine/core";
import Header from "../components/page/header/header";
import { MyFooter } from "../components/page/footer/footer";
import { getCategories } from "../libs/prisma/category";
const items = [
  { title: "Trang chủ", href: "/" },
  { title: "Tìm kiếm", color: "black" },
].map((item, index) => (
  <Anchor href={item.href} key={index} c={item.color}>
    {item.title}
  </Anchor>
));
interface IProps {
  children: ReactNode;
}
async function getDataCategories() {
  const { categories } = await getCategories();
  if (!categories) {
    throw new Error("Failed to fetch data");
  }

  return categories;
}
export default async function SearchLayout({ children }: IProps) {
  const categories = await getDataCategories();
  console.log("categories", categories);
  return (
    <>
      <Header />
      <main className="main">
        <div className="shop-area bg pt-40">
          <div className="container">
            {/* <Breadcrumbs style={{ padding: "16px 0" }}>{items}</Breadcrumbs> */}
            <div className="row pb-60">
              <div className="col-lg-3">
                <SideBarFilter
                  data={categories}
                  keyName="categoryId"
                  filterName="Danh Mục"
                />
              </div>
              <div className="col-lg-9">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <MyFooter />
    </>
  );
}
