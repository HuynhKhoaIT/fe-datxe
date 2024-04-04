'use client';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
const queryClient = new QueryClient();

const fetchOrdersAdmin = async (searchParams: any): Promise<any> => {
    const response = await fetch(`/api/admin/orders/dashboard?${searchParams}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch orders', response);
    }
    return await response.json();
};

interface UseAdmin {
    ordersAdmin: any;
    isLoading: boolean;
    isFetching: boolean;
    error?: string;
    newArray: any;
    arrayDate: object;
}

function mapError(error: unknown | undefined): undefined | string {
    if (!error) return undefined;
    if (error instanceof ResponseError) return error.response.statusText;
    if (error instanceof Error) return error.message;
    return 'Unknown error';
}

export const useAdmin = (): UseAdmin => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const [arrayDate, setArrayDate] = useState<any>([]);
    const startDate: any = searchParams.get('dateStart');
    const endDate: any = searchParams.get('dateEnd');

    const getArrayDate = (startDate: any, endDate: any) => {
        const dateStart = new Date(startDate);
        const dateEnd = new Date(endDate);
        const differenceInTime = dateEnd?.getTime() - dateStart?.getTime();
        // Chuyển đổi sự khác biệt thành số ngày
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        const newDatesArray = Array.from({ length: differenceInDays + 1 }, (_, i) => {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i);
            return currentDate.toISOString().slice(0, 10);
        });
        return newDatesArray;
    };

    const {
        data: ordersAdmin = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.ordersAdmin, searchParams.toString()],
        queryFn: () => fetchOrdersAdmin(searchParams.toString()),
        refetchOnWindowFocus: false,
        retry: 2,
    });

    useEffect(() => {
        if (!isPlaceholderData && searchParams.toString()) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.ordersAdmin, searchParams.toString()],
                queryFn: () => fetchOrdersAdmin(searchParams.toString()),
            });
        }
        if (startDate && endDate) {
            setArrayDate(getArrayDate(startDate, endDate));
        } else {
            setArrayDate(getArrayDate(firstDayOfMonth, lastDayOfMonth));
        }
    }, [ordersAdmin, searchParams, isPlaceholderData, queryClient]);

    const newArray = ordersAdmin.map((item: any) => ({
        id: item.id,
        step: item.step,
        dateTime: item.dateTime,
    }));
    return {
        ordersAdmin,
        isLoading,
        isFetching,
        error: mapError(error),
        newArray,
        arrayDate,
    };
};
