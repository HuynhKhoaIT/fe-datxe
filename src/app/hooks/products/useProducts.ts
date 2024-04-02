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

const useProductByCategory = (limit: any, categoryId: string) => {
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

const fetchProductDetail = async (id: string) => {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch product ', response);
    }
    return await response.json();
};

const fetchProductReview = async (id: string) => {
    const response = await fetch(`/api/reviews/product/${id}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch product relate', response);
    }
    return await response.json();
};

const useProduct = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.productDetail, id],
        queryFn: () => fetchProductDetail(id),
    });
};

const useProductReview = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.productListReview, id],
        queryFn: () => fetchProductReview(id),
    });
};

const useProductsUserPage = (garageid: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.productsUserPage, garageid],
        queryFn: () => fetchProductDetail(garageid),
    });
};

export {
    useProductByCategory,
    useProduct,
    fetchProductByCategory,
    useProductRelate,
    fetchProductRelate,
    useProductReview,
    fetchProductDetail,
    fetchProductReview,
};
