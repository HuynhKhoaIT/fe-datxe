import { ReactNode, Fragment } from "react";
import Header from "../layout/common/desktop/HeaderDesktop";
import { MyFooter } from "../layout/common/desktop/Footer/FooterDesktop";
import HeaderMobile from "@/app/layout/common/mobile/HeaderMobile";
import FooterMobile from "@/app/layout/common/mobile/Footer/FooterMobile";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
interface IProps {
  children: ReactNode;
}
export default function RegisterLayout({ children }: IProps) {
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
