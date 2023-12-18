import { ReactNode, Suspense } from "react";
import Menu from "../components/profile-sidebar/Menu";
import HeaderAdmin from "../components/header/header-admin";
import { MyFooter } from "../components/footer/footer";
interface IProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
  return (
    <>
      <HeaderAdmin />
      <main className="main">
        <div className="user-profile pt-40 pb-40">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                {/* <Menu /> */}
              </div>
              <div className="col-md-12">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <MyFooter />
    </>
  );
}
