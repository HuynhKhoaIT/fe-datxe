"use client";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { ResponseError } from "@/utils/until/ResponseError";
import { QUERY_KEY } from "@/constants";
const queryClient = new QueryClient();

const fetchMyProfile = async (): Promise<any> => {
  const response = await fetch(`/api/admin/garage/my-garage`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch my garage", response);
  }
  return await response.json();
};

interface useMyProfile {
  profile: any;
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

export const useMyProfile = (): useMyProfile => {
  const queryClient = useQueryClient();
  const {
    data: profile = [],
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: [QUERY_KEY.profile],
    queryFn: () => fetchMyProfile(),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return {
    profile,
    isLoading,
    isFetching,
    error: mapError(error),
  };
};
