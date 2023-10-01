/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { GET_SERVICE_ENDPOINT } from './constants/endpoints';
import { IProduct } from '@/interfaces/product';
/**
 * Get getOrders.
 *
 * @return {Promise<void>}
 */

export const getServices = async () => {
    try {
        const res = await axios.get(`${GET_SERVICE_ENDPOINT}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin dịch vụ'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const getServicesByCat = async (filter: string) => {
    try {
        const res = await axios.get(`${GET_SERVICE_ENDPOINT}&${filter}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin dịch vụ'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const getServiceHot = async ({ limit = 8 }) => {
    try {
        const res = await axios.get(`${GET_SERVICE_ENDPOINT}&limit=${limit}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const getServiceSearch = async (search: string) => {
    try {
        const res = await axios.get(`${GET_SERVICE_ENDPOINT}&${search}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm');
    }
};
