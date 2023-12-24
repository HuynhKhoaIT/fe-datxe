import { ReactNode, Suspense } from "react";
import Header from "../components/page/header/header";
import { MyFooter } from "../components/page/footer/footer";
import { LoadingPage } from "../components/loading";
interface IProps {
  children: ReactNode;
}
export default async function Layout({ children }: IProps) {
  return (
    <>
      {/* <Header /> */}
      <main className="main">
        <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      </main>
      {/* <MyFooter /> */}
    </>
  );
}
