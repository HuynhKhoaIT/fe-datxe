import { ReactNode, Suspense } from "react";
import Menu from "../components/profile-sidebar/Menu";
import Header from "../components/page/header/header";
import { MyFooter } from "../components/page/footer/footer";
interface IProps {
  children: ReactNode;
}
export default async function DashboardLayout({ children }: IProps) {
  return (
    <>
      <Header />
      <main className="main">
        <div className="user-profile pt-40 pb-40">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <Menu />
              </div>
              <div className="col-md-9">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <MyFooter />
    </>
  );
}
