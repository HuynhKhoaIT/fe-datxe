'use client';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const addCategory = async (values: any): Promise<any> => {
    const response = await fetch(`/api/product-category`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new category', response);
    }
    return await response.json();
};

const updateCategory = async (values: any): Promise<any> => {
    const response = await fetch(`/api/product-category/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new category', response);
    }
    return await response.json();
};

interface UseCategory {
    addItem: any;
    updateItem: any;
}

export const useAddCategory = (): UseCategory => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm danh mục thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.categories, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            router.back();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật đơn hàng thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.categories, searchParams.toString(), 1],
            });
        },
    });

    return {
        addItem,
        updateItem,
    };
};
