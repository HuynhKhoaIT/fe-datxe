"use client";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ResponseError } from "@/utils/until/ResponseError";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QUERY_KEY } from "@/constants";
import { useSearchParams } from "next/navigation";
import { notifications } from "@mantine/notifications";
const queryClient = new QueryClient();

const fetchCars = async (searchParams: any, page: number): Promise<any> => {
  const response = await fetch(`/api/car?${searchParams}&page=${page}`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch cars", response);
  }
  return await response.json();
};

const fetchCarsDlbd = async (searchParams: any, page: number): Promise<any> => {
  const response = await fetch(`/api/car/dlbd?${searchParams}&page=${page}`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch cars", response);
  }
  return await response.json();
};

const deleteCar = async (id: string): Promise<any> => {
  const response = await fetch(`/api/car/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to delete car", response);
  }
  return await response.json();
};

interface useCars {
  cars: any;
  carsDlbd: any;
  isLoading: boolean;
  isFetching: boolean;
  error?: string;
  page?: number;
  activeTab?: string | null;
  setPage: Dispatch<SetStateAction<number>>;
  setActiveTab: Dispatch<SetStateAction<string | null>>;
  deleteItem: any;
}

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

export const useCars = (): useCars => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [pageDlbd, setPageDlbd] = useState<number>(1);

  const [activeTab, setActiveTab] = useState<string | null>("first");

  const {
    data: cars = [],
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: [QUERY_KEY.cars, searchParams.toString(), page],
    queryFn: () => fetchCars(searchParams.toString(), page),
    refetchOnWindowFocus: false,
    retry: 2,
  });
  const {
    data: carsDlbd = [],
    isLoading: isLoadingDlbd,
    isFetching: isFetchingDlbd,
    error: errorDlbd,
    isPlaceholderData: isPlaceholderDataDlbd,
  } = useQuery({
    queryKey: [QUERY_KEY.carsDlbd, searchParams.toString(), pageDlbd],
    queryFn: () => fetchCarsDlbd(searchParams.toString(), pageDlbd),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  useEffect(() => {
    if (activeTab == "first" && !isPlaceholderData && page < cars?.totalPage) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.cars, searchParams.toString(), page + 1],
        queryFn: () => fetchCars(searchParams.toString(), page + 1),
      });
    } else if (activeTab == "first" && !isPlaceholderData && searchParams) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.cars, searchParams.toString(), page],
        queryFn: () => fetchCars(searchParams.toString(), page),
      });
    } else if (activeTab == "second" && !isPlaceholderDataDlbd) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.carsDlbd, searchParams.toString(), pageDlbd + 1],
        queryFn: () => fetchCarsDlbd(searchParams.toString(), pageDlbd + 1),
      });
    } else if (
      activeTab == "second" &&
      !isPlaceholderDataDlbd &&
      searchParams
    ) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.carsDlbd, searchParams.toString(), pageDlbd],
        queryFn: () => fetchCarsDlbd(searchParams.toString(), pageDlbd),
      });
    }
  }, [
    cars,
    searchParams,
    isPlaceholderData,
    page,
    queryClient,
    isPlaceholderDataDlbd,
  ]);

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      notifications.show({
        title: "Thành công",
        message: "Xoá xe thành công",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.cars, searchParams.toString(), page],
      });
    },
  });

  return {
    cars,
    isLoading,
    isFetching,
    error: mapError(error),
    page,
    setPage,
    deleteItem,
    carsDlbd,
    activeTab,
    setActiveTab,
  };
};
