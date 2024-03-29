'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import useFetch from '@/app/hooks/useFetch';
import { getOptionsCategories } from '@/utils/until';
const queryClient = new QueryClient();

const fetchProducts = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/products?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch products', response);
    }
    return await response.json();
};

const fetchProductsDlbd = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/products/dlbd?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch products', response);
    }
    return await response.json();
};

const deleteProduct = async (id: string): Promise<any> => {
    const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete product', response);
    }
    return await response.json();
};

interface useProduct {
    products: any;
    productsDlbd: any;
    isLoading: boolean;
    isLoadingDlbd: boolean;
    isFetching: boolean;
    error?: string;
    page?: number;
    activeTab?: string | null;
    setPage: Dispatch<SetStateAction<number>>;
    setActiveTab: Dispatch<SetStateAction<string | null>>;
    deleteItem: any;
    pageDlbd: number;
    setPageDlbd: Dispatch<SetStateAction<number>>;
    categoryOptions: any;
}

function mapError(error: unknown | undefined): undefined | string {
    if (!error) return undefined;
    if (error instanceof ResponseError) return error.response.statusText;
    if (error instanceof Error) return error.message;
    return 'Unknown error';
}

export const useProduct = (): useProduct => {
    const queryClient = useQueryClient();

    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);
    const [pageDlbd, setPageDlbd] = useState<number>(1);

    const [activeTab, setActiveTab] = useState<string | null>('first');

    const {
        data: products = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.products, searchParams.toString(), page],
        queryFn: () => fetchProducts(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });
    const {
        data: productsDlbd = [],
        isLoading: isLoadingDlbd,
        isFetching: isFetchingDlbd,
        error: errorDlbd,
        isPlaceholderData: isPlaceholderDataDlbd,
    } = useQuery({
        queryKey: [QUERY_KEY.productsDlbd, searchParams.toString(), pageDlbd],
        queryFn: () => fetchProductsDlbd(searchParams.toString(), pageDlbd),
        refetchOnWindowFocus: false,
        retry: 2,
    });

    useEffect(() => {
        if (activeTab == 'first' && !isPlaceholderData && page < products?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.products, searchParams.toString(), page + 1],
                queryFn: () => fetchProducts(searchParams.toString(), page + 1),
            });
        } else if (activeTab == 'first' && !isPlaceholderData && searchParams) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.products, searchParams.toString(), page],
                queryFn: () => fetchProducts(searchParams.toString(), page),
            });
        } else if (activeTab == 'second' && !isPlaceholderDataDlbd) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.productsDlbd, searchParams.toString(), pageDlbd + 1],
                queryFn: () => fetchProductsDlbd(searchParams.toString(), pageDlbd + 1),
            });
        } else if (activeTab == 'second' && !isPlaceholderDataDlbd && searchParams) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.productsDlbd, searchParams.toString(), pageDlbd],
                queryFn: () => fetchProductsDlbd(searchParams.toString(), pageDlbd),
            });
        }
    }, [products, searchParams, isPlaceholderData, page, queryClient, isPlaceholderDataDlbd]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            notifications.show({
                title: 'Thành công',
                message: 'Xoá sản phẩm thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.products, searchParams.toString(), page],
            });
        },
    });

    const { data: categoryOptions } = useFetch({
        queryKey: [QUERY_KEY.optionsCategory],
        queryFn: () => getOptionsCategories(),
        options: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            refetchInterval: false,
        },
    });
    return {
        products,
        isLoading,
        isFetching,
        error: mapError(error),
        page,
        setPage,
        productsDlbd,
        activeTab,
        pageDlbd,
        setPageDlbd,
        setActiveTab,
        deleteItem,
        categoryOptions,
        isLoadingDlbd,
    };
};
