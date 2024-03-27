import axios from 'axios';

export async function getExperts(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/garage?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error: ', error);
    }
}
