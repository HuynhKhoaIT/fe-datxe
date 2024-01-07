import { ReactNode, Suspense } from "react";
import Header from "@/app/components/page/header/header";
import { SideBarFilter } from "@/app/components/elements/shop-sidebar/sideBar";
import { MyFooter } from "@/app/components/page/footer/footer";
import { getCategories } from "@/utils/category";
interface IProps {
  children: ReactNode;
}
export default async function SearchLayout({ children }: IProps) {
  const categorys = await getCategories();
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
                  data={categorys}
                  filterName="Danh mục"
                  keyName="cat_id"
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
