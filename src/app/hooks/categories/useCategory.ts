import { QUERY_KEY } from '@/constants';
import { ResponseError } from '@/utils/until/ResponseError';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const fetchCategoriesList = async (searchParams: any, limit = 10) => {
    const response = await fetch(`/api/admin/product-category?${searchParams}&limit=${limit}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useCategories = (limit: any) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.categories, searchParams.toString(), limit],
        queryFn: () => fetchCategoriesList(searchParams.toString(), limit),
    });
};

export { useCategories, fetchCategoriesList };
