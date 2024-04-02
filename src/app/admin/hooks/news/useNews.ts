'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const fetchNewsList = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/posts?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch posts', response);
    }
    return await response.json();
};

const deleteNews = async (id: string): Promise<any> => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete news', response);
    }
    return await response.json();
};

interface UseNews {
    newsList: any;
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

export const useNewsList = (): UseNews => {
    const queryClient = useQueryClient();

    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);

    const {
        data: newsList = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.newsList, searchParams.toString(), page],
        queryFn: () => fetchNewsList(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });

    useEffect(() => {
        if (!isPlaceholderData && page < newsList?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.newsList, searchParams.toString(), page + 1],
                queryFn: () => fetchNewsList(searchParams.toString(), page + 1),
            });
        } else if (!isPlaceholderData && searchParams.toString()) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.newsList, searchParams.toString(), page],
                queryFn: () => fetchNewsList(searchParams.toString(), page),
            });
        }
    }, [newsList, searchParams, isPlaceholderData, page, queryClient]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteNews,
        onSuccess: () => {
            notifications.show({
                title: 'Thành công',
                message: 'Xoá tin tức thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.newsList, searchParams.toString(), page],
            });
        },
    });

    return {
        newsList,
        isLoading,
        isFetching,
        error: mapError(error),
        page,
        setPage,
        deleteItem,
    };
};
