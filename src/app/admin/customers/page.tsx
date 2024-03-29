"use client";
import CustomerListPage from "./CustomerListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Fragment } from "react";
import { useCustomers } from "../hooks/customer/useCustomer";
const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Quản lý khách hàng" },
];

export default function Customers() {
  const {
    customers,
    isLoading,
    isLoadingDlbd,
    isFetching,
    error,
    page,
    setPage,
    deleteItem,
    customersDlbd,
    activeTab,
    setActiveTab,
  } = useCustomers();

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CustomerListPage
        customers={customers}
        customersDlbd={customersDlbd}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        isLoadingDlbd={isLoadingDlbd}
        deleteItem={deleteItem}
      />
    </Fragment>
  );
}
