import axios from 'axios';

export async function getOrders(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/orders?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error:', error);
    }
}
