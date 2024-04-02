import { QUERY_KEY } from '@/constants';
import { ResponseError } from '@/utils/until/ResponseError';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const fetchNewsList = async (searchParams: any, limit = 10) => {
    const response = await fetch(`/api/posts?${searchParams}&limit=${limit}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useNewsList = (limit: any) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.news, searchParams.toString(), limit],
        queryFn: () => fetchNewsList(searchParams.toString(), limit),
    });
};

const fetchNewsDetail = async (id: string) => {
    const response = await fetch(`/api/posts/${id}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useNewsDetail = (id: any) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.news, id],
        queryFn: () => fetchNewsDetail(id),
    });
};

export { useNewsList, fetchNewsList, useNewsDetail, fetchNewsDetail };
