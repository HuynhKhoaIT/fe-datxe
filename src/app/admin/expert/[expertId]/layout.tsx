import { ReactNode, Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
interface IProps {
  children: ReactNode;
}

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách chuyên gia", href: "/admin/expert" },
  { title: "Cập nhật chuyên gia" },
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
