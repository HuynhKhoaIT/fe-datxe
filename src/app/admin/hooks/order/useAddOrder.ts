'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { getOptionsBrands } from '@/utils/until';
import useFetch from '@/app/hooks/useFetch';
const queryClient = new QueryClient();

const addOrder = async (values: any): Promise<any> => {
    const response = await fetch(`/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new order', response);
    }
    return await response.json();
};

const updateOrder = async (values: any): Promise<any> => {
    const response = await fetch(`/api/orders/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new order', response);
    }
    return await response.json();
};

const updateStepOrder = async (values: any): Promise<any> => {
    console.log(values);
    const response = await fetch(`/api/orders/step`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: values?.id, step: values?.step, cancelReason: values?.cancelReason }),
    });

    if (!response.ok) {
        throw new ResponseError('Failed to update step order', response);
    }
    return await response.json();
};

interface UseOrders {
    addItem: any;
    updateItem: any;
    updateStep: any;
    brandOptions: any;
    isLoadingBrand: boolean;
}

export const useAddOrder = (): UseOrders => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addOrder,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm đơn hàng thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.orders, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateOrder,
        onSuccess: () => {
            router.back();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật đơn hàng thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.orders, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateStep } = useMutation({
        mutationFn: updateStepOrder,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật trạng thái  thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.orders, searchParams.toString(), 1],
            });
        },
    });

    const { data: brandOptions, isLoading: isLoadingBrand } = useFetch({
        queryKey: ['brandOptions'],
        queryFn: () => getOptionsBrands(),
        options: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            refetchInterval: false,
        },
    });
    return {
        addItem,
        updateItem,
        updateStep,
        brandOptions,
        isLoadingBrand,
    };
};
