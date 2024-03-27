import axios from 'axios';

export async function getOrders(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/orders?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error:', error);
    }
}

export async function getOptionsCar({ s }: any) {
    try {
        const res = await axios.get(`/api/car/get-by-plates?s=${s}`);
        if (!res.data) {
            throw new Error('Failed to fetch data');
        }
        console.log(res.data);
        const dataOption = res?.data?.map((item: any) => ({
            value: item.id.toString(),
            label: item.numberPlates,
        }));
        return dataOption;
    } catch (error) {
        console.error('error: ', error);
    }
}
