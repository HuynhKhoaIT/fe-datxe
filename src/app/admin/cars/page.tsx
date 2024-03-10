import CarsListPage from "./CarsListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { getCars } from "@/app/libs/prisma/car";
import { Fragment } from "react";

export default async function Categories() {
  let cars = await getCars({});
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách xe" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CarsListPage dataSource={cars} />
    </Fragment>
  );
}
