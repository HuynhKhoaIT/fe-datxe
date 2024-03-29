'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const fetchCustomers = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/customer?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch customers', response);
    }
    return await response.json();
};

const fetchCustomersDlbd = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/customer/dlbd?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch customers', response);
    }
    return await response.json();
};

const deleteCustomer = async (id: string): Promise<any> => {
    const response = await fetch(`/api/customer/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete customer', response);
    }
    return await response.json();
};

interface useCustomers {
    customers: any;
    customersDlbd: any;
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
}

function mapError(error: unknown | undefined): undefined | string {
    if (!error) return undefined;
    if (error instanceof ResponseError) return error.response.statusText;
    if (error instanceof Error) return error.message;
    return 'Unknown error';
}

export const useCustomers = (): useCustomers => {
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);
    const [pageDlbd, setPageDlbd] = useState<number>(1);

    const [activeTab, setActiveTab] = useState<string | null>('first');

    const {
        data: customers = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.customers, searchParams.toString(), page],
        queryFn: () => fetchCustomers(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });
    const {
        data: customersDlbd = [],
        isLoading: isLoadingDlbd,
        isFetching: isFetchingDlbd,
        error: errorDlbd,
        isPlaceholderData: isPlaceholderDataDlbd,
    } = useQuery({
        queryKey: [QUERY_KEY.customersDlbd, searchParams.toString(), pageDlbd],
        queryFn: () => fetchCustomersDlbd(searchParams.toString(), pageDlbd),
        refetchOnWindowFocus: false,
        retry: 2,
    });

    useEffect(() => {
        if (activeTab == 'first' && !isPlaceholderData && page < customers?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.customers, searchParams.toString(), page + 1],
                queryFn: () => fetchCustomers(searchParams.toString(), page + 1),
            });
        } else if (activeTab == 'first' && !isPlaceholderData && searchParams) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.customers, searchParams.toString(), page],
                queryFn: () => fetchCustomers(searchParams.toString(), page),
            });
        } else if (activeTab == 'second' && !isPlaceholderDataDlbd) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.customersDlbd, searchParams.toString(), pageDlbd + 1],
                queryFn: () => fetchCustomersDlbd(searchParams.toString(), pageDlbd + 1),
            });
        } else if (activeTab == 'second' && !isPlaceholderDataDlbd && searchParams) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.customersDlbd, searchParams.toString(), pageDlbd],
                queryFn: () => fetchCustomersDlbd(searchParams.toString(), pageDlbd),
            });
        }
    }, [customers, customersDlbd, searchParams, isPlaceholderData, page, queryClient, isPlaceholderDataDlbd]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteCustomer,
        onSuccess: () => {
            notifications.show({
                title: 'Thành công',
                message: 'Xoá khách hàng thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.customers, searchParams.toString(), page],
            });
        },
    });

    return {
        customers,
        isLoading,
        isLoadingDlbd,
        isFetching,
        error: mapError(error),
        page,
        setPage,
        deleteItem,
        customersDlbd,
        activeTab,
        setActiveTab,
        pageDlbd,
        setPageDlbd,
    };
};
