'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { getOptionsBrands, getOptionsCategories, getOptionsCustomers } from '@/utils/until';
import useFetch from '@/app/hooks/useFetch';
const queryClient = new QueryClient();

const addProduct = async (values: any): Promise<any> => {
    const response = await fetch(`/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new product', response);
    }
    return await response.json();
};

const updateProduct = async (values: any): Promise<any> => {
    const response = await fetch(`/api/products/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to update product', response);
    }
    return await response.json();
};
interface UseProduct {
    addItem: any;
    updateItem: any;
    categoryOptions: any;
    isLoadingCategory: boolean;
}

export const useAddProduct = (): UseProduct => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm sản phẩm thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.products, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            router.back();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật sản phẩm thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.products, searchParams.toString(), 1],
            });
        },
    });

    const { data: categoryOptions, isLoading: isLoadingCategory } = useFetch({
        queryKey: [QUERY_KEY.optionsCategory],
        queryFn: () => getOptionsCategories(),
        options: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            refetchInterval: false,
        },
    });

    return {
        addItem,
        updateItem,
        categoryOptions,
        isLoadingCategory,
    };
};
