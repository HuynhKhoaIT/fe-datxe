'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import useFetch from '@/app/hooks/useFetch';
import { getOptionsProvince } from '@/utils/until';

const queryClient = new QueryClient();

const addCustomer = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/customer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new customer', response);
    }
    return await response.json();
};

const updateCustomer = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/customer/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to update customer', response);
    }
    return await response.json();
};
interface UseCustomer {
    addItem: any;
    updateItem: any;
    provinceOptions: any;
    isLoadingProvince: boolean;
}

export const useAddCustomer = (): UseCustomer => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addCustomer,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm khách hàng thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.customers, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateCustomer,
        onSuccess: () => {
            router.back();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật khách hàng thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.customers, searchParams.toString(), 1],
            });
        },
    });

    const { data: provinceOptions, isLoading: isLoadingProvince } = useFetch({
        queryKey: [QUERY_KEY.optionsProvince],
        queryFn: () => getOptionsProvince(),
    });

    return {
        addItem,
        updateItem,
        provinceOptions,
        isLoadingProvince,
    };
};
