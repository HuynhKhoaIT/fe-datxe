'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { getOptionsBrands, getOptionsCustomers } from '@/utils/until';
import useFetch from '@/app/hooks/useFetch';
const queryClient = new QueryClient();

const addCar = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/car`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new car', response);
    }
    return await response.json();
};

const updateCar = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/car/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to update car', response);
    }
    return await response.json();
};
interface UseCar {
    addItem: any;
    updateItem: any;
    brandOptions: any;
    customerOptions: any;
    isLoadingBrand: boolean;
    isLoadingCustomer: boolean;
}

export const useAddCar = (): UseCar => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addCar,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm xe thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.cars, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateCar,
        onSuccess: () => {
            router.back();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật đơn hàng thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.cars, searchParams.toString(), 1],
            });
        },
    });

    const { data: brandOptions, isLoading: isLoadingBrand } = useFetch({
        queryKey: [QUERY_KEY.optionsBrandCar],
        queryFn: () => getOptionsBrands(),
        options: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            refetchInterval: false,
        },
    });

    const { data: customerOptions, isLoading: isLoadingCustomer } = useFetch({
        queryKey: [QUERY_KEY.optionsCustomer],
        queryFn: () => getOptionsCustomers(),
        options: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            refetchInterval: false,
        },
    });

    return {
        addItem,
        updateItem,
        brandOptions,
        isLoadingBrand,
        customerOptions,
        isLoadingCustomer,
    };
};
