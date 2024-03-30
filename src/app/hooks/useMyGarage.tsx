"use client";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { ResponseError } from "@/utils/until/ResponseError";
import { QUERY_KEY } from "@/constants";
const queryClient = new QueryClient();

const fetchMygarage = async (): Promise<any> => {
  const response = await fetch(`/api/garage/my-garage`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch my garage", response);
  }
  return await response.json();
};

interface useMyGarage {
  myGarage: any;
  isLoading: boolean;
  isFetching: boolean;
  error?: string;
}

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

export const useMyGarage = (): useMyGarage => {
  const queryClient = useQueryClient();
  const {
    data: myGarage = [],
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: [QUERY_KEY.myGarage],
    queryFn: () => fetchMygarage(),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return {
    myGarage,
    isLoading,
    isFetching,
    error: mapError(error),
  };
};
