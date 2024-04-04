'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const fetchCategories = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/admin/product-category?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch categories', response);
    }
    return await response.json();
};

const deleteCategory = async (id: string): Promise<any> => {
    const response = await fetch(`/api/admin/product-category/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete category', response);
    }
    return await response.json();
};

interface UseCategories {
    categories: any;
    isLoading: boolean;
    isFetching: boolean;
    error?: string;
    page?: number;
    setPage: Dispatch<SetStateAction<number>>;
    deleteItem: any;
}

function mapError(error: unknown | undefined): undefined | string {
    if (!error) return undefined;
    if (error instanceof ResponseError) return error.response.statusText;
    if (error instanceof Error) return error.message;
    return 'Unknown error';
}

export const useCategories = (): UseCategories => {
    const queryClient = useQueryClient();

    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);

    const {
        data: categories = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.categories, searchParams.toString(), page],
        queryFn: () => fetchCategories(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });

    useEffect(() => {
        if (!isPlaceholderData && page < categories?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.categories, searchParams.toString(), page + 1],
                queryFn: () => fetchCategories(searchParams.toString(), page + 1),
            });
        } else if (!isPlaceholderData && searchParams.toString()) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.categories, searchParams.toString(), page],
                queryFn: () => fetchCategories(searchParams.toString(), page),
            });
        }
    }, [categories, searchParams, isPlaceholderData, page, queryClient]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            notifications.show({
                title: 'Thành công',
                message: 'Xoá danh mục thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.categories, searchParams.toString(), page],
            });
        },
    });

    return {
        categories,
        isLoading,
        isFetching,
        error: mapError(error),
        page,
        setPage,
        deleteItem,
    };
};
