"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Statistical from "../admin/_component/Statistical";
import OrdersListPage from "../layout/dashboard/order/OrdersListPage";
import { getOrders } from "../libs/prisma/order";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { getMyOrders } from "./until";
const queryClient = new QueryClient();

export default function Dashboard() {
  const searchParams = useSearchParams();
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
