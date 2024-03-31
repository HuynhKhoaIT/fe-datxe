import { QUERY_KEY } from '@/constants';
import { ResponseError } from '@/utils/until/ResponseError';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const fetchProductByCategory = async (searchParams: any, categoryId: string, limit = 10) => {
    const response = await fetch(`/api/products?${searchParams}&categoryId=${categoryId}&limit=${limit}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch product by category', response);
    }
    return await response.json();
};

const fetchProductRelate = async (searchParams: any, limit = 10) => {
    const response = await fetch(`/api/products?${searchParams}&limit=${limit}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch product relate', response);
    }
    return await response.json();
};

const useCategory = (limit: any, categoryId: string) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.productsByCategory, searchParams.toString(), categoryId, limit],
        queryFn: () => fetchProductByCategory(searchParams.toString(), categoryId, limit),
    });
};

const useProductRelate = (limit: any) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.productsRelate, searchParams.toString(), limit],
        queryFn: () => fetchProductRelate(searchParams.toString(), limit),
    });
};

export { useCategory, fetchProductByCategory, useProductRelate, fetchProductRelate };
