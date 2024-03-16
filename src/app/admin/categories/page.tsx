import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CategoryListPage from "./CategoryListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { getCategories } from "@/app/libs/prisma/category";
import { apiUrl } from "@/constants";
import { getServerSession } from "next-auth";
import { Fragment } from "react";

async function getData() {
  const session = await getServerSession(authOptions);
  let garageId = "0";
  if (session?.user?.id) {
    garageId = session?.user?.id;
  }
  console.log(session?.user);
  const requestData = {
    garageId: garageId,
    session: session,
  };
  console.log(requestData);
  const res = await getCategories(requestData);
  return {
    categories: res,
    requestData,
  };
}

export default async function Categories() {
  let categories = await getData();

  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh mục sản phẩm" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CategoryListPage
        dataSource={categories?.categories}
        profile={categories?.requestData}
      />
    </Fragment>
  );
}
