import { Fragment, ReactNode, Suspense } from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import HeaderMobile from "@/app/layout/common/mobile/HeaderMobile";
import FooterMobile from "@/app/layout/common/mobile/Footer/FooterMobile";
import Header from "@/app/layout/common/desktop/HeaderDesktop";
import { MyFooter } from "@/app/layout/common/desktop/Footer/FooterDesktop";
interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  return (
    <Fragment>
      {isMobile ? (
        <main>
          <HeaderMobile />
          <div style={{ marginTop: "67px" }}>{children}</div>
          <FooterMobile />
        </main>
      ) : (
        <main>
          <Header />
          <div>{children}</div>
          <MyFooter />
        </main>
      )}
    </Fragment>
  );
}
