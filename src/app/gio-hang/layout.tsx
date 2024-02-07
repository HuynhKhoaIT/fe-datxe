import { ReactNode, Suspense } from "react";
import Header from "../layout/common/desktop/HeaderDesktop";
import { MyFooter } from "../layout/common/desktop/Footer/FooterDesktop";
interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <main>
      <Header />
      <main className="main">{children}</main>
      <MyFooter />
    </main>
  );
}
