/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { GET_ORDER_ENDPOINT } from './constants/endpoints';
/**
 * Get getOrders.
 *
 * @return {Promise<void>}
 */
export const getOrders = async ({ pageNo = 1, token = '' }) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return await axios
        .get(`${GET_ORDER_ENDPOINT}?page=${pageNo}`, config)
        .then((res) => {
            if (res.data) {
                return res.data.data;
            } else {
                return {
                    orders_data: {},
                    error: 'Orders 1 not found',
                };
            }
        })
        .catch((err) => {
            console.log(err.response.data.message);
            return {
                posts_data: {},
                error: err.response.data.message,
            };
        });
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
