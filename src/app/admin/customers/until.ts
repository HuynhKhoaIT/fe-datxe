import axios from 'axios';

export async function getCustomers(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/customer?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error: ', error);
    }
}

export async function getCustomersDLBD(searchParams: any, page: number) {
    try {
        const res = await axios.get(`/api/customer/dlbd?${searchParams}&page=${page}`);
        return res.data;
    } catch (error) {
        console.error('error: ', error);
    }
}
