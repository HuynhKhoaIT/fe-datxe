import { ReactNode, Suspense } from "react";
import { SideBar } from "../shop-sidebar/sideBar";
import { LoadingPage } from "../../loading";

interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <main className="main">
      <div className="shop-area bg pt-60 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SideBar />
            </div>
            <div className="col-lg-9">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
