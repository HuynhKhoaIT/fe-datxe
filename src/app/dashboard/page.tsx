"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Statistical from "../admin/_component/Statistical";
import OrdersListPage from "../layout/dashboard/order/OrdersListPage";
import { getOrders } from "../libs/prisma/order";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { CreateCustomer, getMyOrders } from "./until";
const queryClient = new QueryClient();

export default function Dashboard() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const isNewCustomer = searchParams.get("isNewCustomer");
  if (isNewCustomer && name && phone) {
    const { data } = useFetch({
      queryFn: () => CreateCustomer(name, phone),
    });
  }

  const [page, setPage] = useState<number>(1);

  const {
    data: myOrders,
    isLoading,
    error,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useFetch({
    queryKey: ["myOrders", searchParams.toString(), page],
    queryFn: () => getMyOrders(),
  });

  useEffect(() => {
    if (!isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ["myOrders", searchParams.toString(), page],
        queryFn: () => getMyOrders(),
        staleTime: Infinity,
      });
    }
  }, [searchParams, isPlaceholderData, page, queryClient, myOrders]);
  console.log(myOrders);
  return (
    <>
      <div className={styles.page}>
        <Statistical />
      </div>
      <OrdersListPage dataSource={myOrders} />
    </>
  );
}
