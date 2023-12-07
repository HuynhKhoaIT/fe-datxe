/**
 * External Dependencies.
 */
import axios from 'axios';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
/**
 * Internal Dependencies.
 */
import { GET_ORDER_ENDPOINT, GET_ORDER_DETAIL_ENDPOINT } from './constants/endpoints';
import { IOrder } from '@/interfaces/order';
import { IOrderDetail } from '@/interfaces/orderDetail';
/**
 * Get getOrders.
 *
 * @return {Promise<void>}
 */
export const getOrders = async (token: String, pageNo = 1) => {
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.get(`${GET_ORDER_ENDPOINT}?page=${pageNo}`, config);
            return res.data.data as Promise<IOrder[]>;
        } catch (error) {
            throw new Error('Lỗi trong quá trình lấy danh sách đơn hàng');
        }
    }
    //
};

export const getOrder = async (orderId = 0) => {
    const session = await getServerSession(authOptions);
    if (session?.user?.token && orderId != 0) {
        const config = {
            headers: { Authorization: `Bearer ${session?.user?.token}` },
        };
        const res = await axios.get(`${GET_ORDER_ENDPOINT}/${orderId}`, config);
        return res.data.data as Promise<IOrder>;
    }
};
export const getSchedule = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user?.token) {
        const config = {
            headers: { Authorization: `Bearer ${session?.user?.token}` },
        };
        const res = await axios.get(`${GET_ORDER_ENDPOINT}`, config);
        return res.data.data as Promise<IOrder>;
    }
};

export const getOrderDetail = async (orderId = 0) => {
    const session = await getServerSession(authOptions);
    if (session?.user?.token && orderId != 0) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${session?.user?.token}` },
            };
            const res = await axios.get(`${GET_ORDER_DETAIL_ENDPOINT}/${orderId}`, config);
            return res.data.data as Promise<IOrderDetail[]>;
        } catch (error) {}
    }
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

export const checkOutCart = async (carId: any, arrivalTime: string, cartData: object, token: string) => {
    console.log(arrivalTime);
    console.log(cartData);
    console.log('token', token);
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const data = {
                car_id: carId,
                arrival_time: arrivalTime,
                items: cartData,
            };
            const res = await axios.post(`${GET_ORDER_ENDPOINT}`, data, config);
            console.log(res);
            return res.data.data;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình tạo thông tin xe');
    }
};
