import { ReactNode, Suspense } from "react";
import Header from "../components/header/header";
import { MyFooter } from "../components/footer/footer";
interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      <main className="main">
        <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
      </main>
      <MyFooter />
    </>
  );
}
