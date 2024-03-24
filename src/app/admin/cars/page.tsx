"use client";
import { useDisclosure } from "@mantine/hooks";
import CarsListPage from "./CarsListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import useFetch from "@/app/hooks/useFetch";
import { getCars, getCarsDLBD } from "./until";
const queryClient = new QueryClient();

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách xe" },
];

export default function Cars() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string | null>("first");

  const {
    data: cars,
    isLoading,
    error,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useFetch({
    queryKey: ["cars", page],
    queryFn: () => getCars(searchParams.toString(), page),
  });

  const {
    data: carsDlbd,
    isLoading: isLoadingDlbd,
    isPlaceholderData: isPlaceholderDataDlbd,
  } = useFetch({
    queryKey: ["carsDlbd", page],
    queryFn: () => getCarsDLBD(searchParams.toString(), page),
  });

  useEffect(() => {
    console.log(activeTab == "second" && !isPlaceholderDataDlbd);
    if (activeTab == "first" && !isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ["cars", page],
        queryFn: () => getCars(searchParams.toString(), page),
        staleTime: Infinity,
      });
    } else if (activeTab == "second" && !isPlaceholderDataDlbd) {
      queryClient.prefetchQuery({
        queryKey: ["carsDlbd", page],
        queryFn: () => getCarsDLBD(searchParams.toString(), page),
        staleTime: Infinity,
      });
    }
  }, [
    searchParams,
    isPlaceholderData,
    page,
    queryClient,
    activeTab,
    cars,
    isPlaceholderDataDlbd,
  ]);

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CarsListPage
        cars={cars}
        carsDlbd={carsDlbd}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        page={page}
        setPage={setPage}
        loading={isLoading || isLoadingDlbd}
        refetch={refetch}
      />
    </Fragment>
  );
}
