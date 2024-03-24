import axios from 'axios';

export async function getMarketing(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/marketing-campaign?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error:', error);
    }
}
