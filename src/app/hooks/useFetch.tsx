import { useQuery } from "@tanstack/react-query";

export default function useFetch({ queryKey, queryFn, options }: any) {
  const getListQuery: any = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options,
  });

  return getListQuery;
}
