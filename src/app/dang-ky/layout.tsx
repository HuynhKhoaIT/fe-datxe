import { ReactNode, Suspense } from "react";
import Header from "../components/page/header/header";
import { MyFooter } from "../components/page/footer/footer";

interface IProps {
  children: ReactNode;
}
export default function RegisterLayout({ children }: IProps) {
  return (
    <>
      <Header />
      <main className="main">
        <div className="login-area pd-50">
          <div className="container">
            <div className="col-md-5 mx-auto">{children}</div>
          </div>
        </div>
      </main>
      <MyFooter />
    </>
  );
}
