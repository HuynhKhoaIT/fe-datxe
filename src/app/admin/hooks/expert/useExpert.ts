'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const fetchExperts = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/garage?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch experts', response);
    }
    return await response.json();
};

const deleteExpert = async (id: string): Promise<any> => {
    const response = await fetch(`/api/garage/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete expert', response);
    }
    return await response.json();
};

interface UseExperts {
    experts: any;
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

export const useExperts = (): UseExperts => {
    const queryClient = useQueryClient();

    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);

    const {
        data: experts = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.experts, searchParams.toString(), page],
        queryFn: () => fetchExperts(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });

    useEffect(() => {
        if (!isPlaceholderData && page < experts?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.experts, searchParams.toString(), page + 1],
                queryFn: () => fetchExperts(searchParams.toString(), page + 1),
            });
        } else if (!isPlaceholderData && searchParams.toString()) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.experts, searchParams.toString(), page],
                queryFn: () => fetchExperts(searchParams.toString(), page),
            });
        }
    }, [experts, searchParams, isPlaceholderData, page, queryClient]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteExpert,
        onSuccess: () => {
            notifications.show({
                title: 'Thành công',
                message: 'Xoá chuyên gia thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.experts, searchParams.toString(), page],
            });
        },
    });

    return {
        experts,
        isLoading,
        isFetching,
        error: mapError(error),
        page,
        setPage,
        deleteItem,
    };
};
