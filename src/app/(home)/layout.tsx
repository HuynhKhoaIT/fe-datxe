import { ReactNode, Suspense } from "react";
import Header from "../components/page/header/header";
import { MyFooter } from "../components/page/footer/footer";
interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <main>
      <Header />
      <div>{children}</div>
      <MyFooter />
    </main>
  );
}
