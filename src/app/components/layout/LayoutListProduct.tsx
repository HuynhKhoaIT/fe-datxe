import { ReactNode, Suspense } from "react";
import Header from "../page/header/header";
import { MyFooter } from "../page/footer/footer";

interface IProps {
  children: ReactNode;
}
export default function LayoutListProduct({ children }: IProps) {
  return (
    <>
      <Header />
      <main className="main">
        <div className="shop-area bg ">
          <div className="container">
            <div className="row  position-relative">
              {/* <div className="col-lg-3">
                            <SideBarCategory />
                        </div> */}
              <div className="col-lg-12">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <MyFooter />
    </>
  );
}
