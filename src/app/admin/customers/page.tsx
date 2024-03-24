"use client";
import { useDisclosure } from "@mantine/hooks";
import CustomerListPage from "./CustomerListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import useFetch from "@/app/hooks/useFetch";
import { getCustomers, getCustomersDLBD } from "./until";
const queryClient = new QueryClient();

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Quản lý khách hàng" },
];

export default function Customers() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [loadingTable, handlers] = useDisclosure(true);
  const [activeTab, setActiveTab] = useState<string | null>("first");

  const {
    data: customers,
    isLoading,
    error,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useFetch({
    queryKey: ["customers", page],
    queryFn: () => getCustomers(searchParams.toString(), page),
  });

  const {
    data: customersDlbd,
    isLoading: isLoadingDlbd,
    isPlaceholderData: isPlaceholderDataDlbd,
  } = useFetch({
    queryKey: ["customersDlbd", page],
    queryFn: () => getCustomersDLBD(searchParams.toString(), page),
  });

  useEffect(() => {
    console.log(activeTab == "second" && !isPlaceholderDataDlbd);
    if (activeTab == "first" && !isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ["cars", page],
        queryFn: () => getCustomers(searchParams.toString(), page),
        staleTime: Infinity,
      });
    } else if (activeTab == "second" && !isPlaceholderDataDlbd) {
      queryClient.prefetchQuery({
        queryKey: ["customersDlbd", page],
        queryFn: () => getCustomersDLBD(searchParams.toString(), page),
        staleTime: Infinity,
      });
    }
  }, [
    searchParams,
    isPlaceholderData,
    page,
    queryClient,
    activeTab,
    customers,
    isPlaceholderDataDlbd,
  ]);
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
        refetch={refetch}
      />
    </Fragment>
  );
}
