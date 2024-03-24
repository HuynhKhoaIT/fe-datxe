import axios from 'axios';

export async function getCars(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/car?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error: ', error);
    }
}

export async function getCarsDLBD(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/car/dlbd?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error: ', error);
    }
}
