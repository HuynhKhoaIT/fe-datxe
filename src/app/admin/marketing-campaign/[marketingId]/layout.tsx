import { ReactNode, Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
interface IProps {
  children: ReactNode;
}

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Chương trình", href: "/admin/marketing-campaign" },
  { title: "Cập nhật chương trình" },
];
export default function CreateLayout({ children }: IProps) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  return (
    <Fragment>
      {isMobile ? (
        <div>
          <Breadcrumb breadcrumbs={Breadcrumbs} />
          <div>{children}</div>
        </div>
      ) : (
        <div>
          <Breadcrumb breadcrumbs={Breadcrumbs} />
          <div>{children}</div>
        </div>
      )}
    </Fragment>
  );
}
