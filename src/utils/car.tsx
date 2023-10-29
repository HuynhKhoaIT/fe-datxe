/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { GET_CAR_ENDPOINT } from './constants/endpoints';
import { ICar } from '@/interfaces/car';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
/**
 * Get getCars.
 *
 * @return {Promise<void>}
 */

export const getCars = async (token: string) => {
    // const session = await getServerSession(authOptions);
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.get(`${GET_CAR_ENDPOINT}`, config);
            return res.data.data as Promise<ICar[]>;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin xe');
    }
};

export const addCar = async (newCar: Object, token: String) => {
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.post(`${GET_CAR_ENDPOINT}`, newCar, config);
            return res.data.data as ICar;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình tạo thông tin xe');
    }
};

export const deleteCar = async (carId: string, token: string) => {
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.delete(`${GET_CAR_ENDPOINT}/${carId}`, config);
            return res.data.data as ICar;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình xóa thông tin xe');
    }
};

export const updateCar = async (carId: string, updatedCarData: Object, token: string) => {
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.put(`${GET_CAR_ENDPOINT}/${carId}`, updatedCarData, config);
            console.log(res);
            return res.data.data as ICar;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình cập nhật thông tin xe');
    }
};
