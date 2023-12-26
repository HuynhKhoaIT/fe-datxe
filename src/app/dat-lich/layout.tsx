import { ReactNode, Suspense } from "react";
import Header from "../components/page/header/header";
import { MyFooter } from "../components/page/footer/footer";
import { LoadingPage } from "../components/loading";
interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <MyFooter />
    </>
  );
}
