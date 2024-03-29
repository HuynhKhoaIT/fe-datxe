'use client';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { getOptionsProvince, getUltilities } from '@/utils/until';
import useFetch from '@/app/hooks/useFetch';
const queryClient = new QueryClient();

const addExpert = async (values: any): Promise<any> => {
    const response = await fetch(`/api/garage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new expert', response);
    }
    return await response.json();
};

const updateExpert = async (values: any): Promise<any> => {
    const response = await fetch(`/api/garage/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new expert', response);
    }
    return await response.json();
};

interface UseExpert {
    addItem: any;
    updateItem: any;
    provinceOptions: any;
    isLoadingProvince: boolean;
    UltilitiesOptions: any;
}

export const useAddExpert = (): UseExpert => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addExpert,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm chuyên gia thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.experts, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateExpert,
        onSuccess: () => {
            router.back();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật chuyên gia thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.experts, searchParams.toString(), 1],
            });
        },
    });
    const { data: provinceOptions, isLoading: isLoadingProvince } = useFetch({
        queryKey: [QUERY_KEY.optionsProvince],
        queryFn: () => getOptionsProvince(),
    });
    const { data: UltilitiesOptions, isLoading: isLoadingUltilities } = useFetch({
        queryKey: [QUERY_KEY.optionsultilities],
        queryFn: () => getUltilities(),
    });

    return {
        addItem,
        updateItem,
        provinceOptions,
        isLoadingProvince,
        UltilitiesOptions,
    };
};
