import axios from 'axios';

export async function getProducts(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/products?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error: ', error);
    }
}

export async function getProductsDLBD(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/products/dlbd?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error: ', error);
    }
}
