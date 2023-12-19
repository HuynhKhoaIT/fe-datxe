import { ReactNode, Suspense } from "react";
import { SideBar } from "../components/elements/shop-sidebar/sideBar";
import Link from "next/link";
import { Breadcrumbs, Anchor } from "@mantine/core";
import Header from "../components/page/header/header";
import { MyFooter } from "../components/page/footer/footer";
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
export default function SearchLayout({ children }: IProps) {
  return (
    <>
      <Header />
      <main className="main">
        <div className="shop-area bg">
          <div className="container">
            <Breadcrumbs style={{ padding: "16px 0" }}>{items}</Breadcrumbs>
            <div className="row pb-60">
              <div className="col-lg-3">
                <SideBar />
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
