import { Fragment, ReactNode, Suspense } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
interface IProps {
  children: ReactNode;
}

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách bài viết", href: "/admin/blogs" },
  { title: "Thêm bài viết" },
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
