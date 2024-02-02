import { ReactNode, Suspense } from "react";
import Header from "../layout/common/desktop/HeaderDesktop";
import { MyFooter } from "../layout/common/desktop/Footer/FooterDesktop";

interface IProps {
  children: ReactNode;
}
export default function LoginLayout({ children }: IProps) {
  return (
    <>
      <Header />
      <main className="main">
        <div className="login-area py-120">
          <div className="container">
            <div className="col-md-5 mx-auto">{children}</div>
          </div>
        </div>
      </main>
      <MyFooter />
    </>
  );
}
