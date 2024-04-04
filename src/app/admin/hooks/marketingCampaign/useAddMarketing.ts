'use client';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const addMarketing = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/marketing-campaign`, {
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

const updateMarketing = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/marketing-campaign/${values?.id}`, {
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

export const useAddMarketing = (): UseCategory => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addMarketing,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.marketings, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateMarketing,
        onSuccess: () => {
            router.back();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.marketings, searchParams.toString(), 1],
            });
        },
    });

    return {
        addItem,
        updateItem,
    };
};
