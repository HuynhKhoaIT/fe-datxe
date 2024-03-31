import { QUERY_KEY } from '@/constants';
import { ResponseError } from '@/utils/until/ResponseError';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const fetchSearch = async (searchParams: any, limit = 10) => {
    const response = await fetch(`/api/products?${searchParams}&limit=${limit}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch cars', response);
    }
    return await response.json();
};

const useSearch = (limit: any) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.search, searchParams.toString(), limit],
        queryFn: () => fetchSearch(searchParams.toString(), limit),
    });
};

export { useSearch, fetchSearch };
