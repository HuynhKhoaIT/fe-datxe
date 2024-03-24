import { useQuery } from "@tanstack/react-query";

export default function useFetch({ queryKey, queryFn }: any) {
  const getListQuery: any = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false,
  });

  return getListQuery;
}
