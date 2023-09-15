/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { GET_ORDER_ENDPOINT } from './constants/endpoints';
import { IOrder } from '@/interfaces/order';
/**
 * Get getOrders.
 *
 * @return {Promise<void>}
 */
export const getOrders = async ({ pageNo = 1, token = '' }) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.get(`${GET_ORDER_ENDPOINT}?page=${pageNo}`, config);
    return res.data.data as Promise<IOrder[]>;
};

export const getOrderDetail = async (orderId = 0, token = '') => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.get(`${GET_ORDER_ENDPOINT}/${orderId}`, config);
    return res.data.data as Promise<IOrder[]>;
};

export function showStatus(status: any) {
    let s = 'Đang tiếp nhận';
    switch (status) {
        case '1':
            s = 'Tiếp nhận';
            break;
        case '2':
            s = 'Báo giá';
            break;
        case '7':
            s = 'Hoàn thành';
            break;
        default:
            s = 'Đang xử lý';
            break;
    }
    return s;
}
