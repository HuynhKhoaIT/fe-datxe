/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { CUSTOMER_CARE_ENDPOINT } from './constants/endpoints';
import { ICustomerCare } from '@/interfaces/customerCare';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
/**
 * Get getCars.
 *
 * @return {Promise<void>}
 */

export const getCustomerCares = async (token: string) => {
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.get(`${CUSTOMER_CARE_ENDPOINT}`, config);

            console.log('res', res.data);
            return res.data as Promise<ICustomerCare[]>;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy đặt lịch');
    }
};

export const getCustomerCare = async (token: string, customerCareId: string) => {
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.get(`${CUSTOMER_CARE_ENDPOINT}/${customerCareId}`, config);
            return res.data.data as Promise<ICustomerCare[]>;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy đặt lịch');
    }
};

export const addCustomerCare = async (newCustomerCare: Object, token: String) => {
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.post(`${CUSTOMER_CARE_ENDPOINT}`, newCustomerCare, config);
            return res.data.data as ICustomerCare;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình tạo đặt lịch');
    }
};

export const deleteCustomerCare = async (customerCareId: string, token: string) => {
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.delete(`${CUSTOMER_CARE_ENDPOINT}/${customerCareId}`, config);
            return res.data.data as ICustomerCare;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình xóa đặt lịch');
    }
};

export const updateCustomerCare = async (customerCareId: string, updatedCustomerCare: Object, token: string) => {
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.put(`${CUSTOMER_CARE_ENDPOINT}/${customerCareId}`, updatedCustomerCare, config);
            console.log(res);
            return res.data.data as ICustomerCare;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình cập nhật đặt lịch');
    }
};

export const getCustomerCareCreate = async (token: string, garageId: string) => {
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.get(`${CUSTOMER_CARE_ENDPOINT}/create?garage_id=${garageId}}`, config);

            console.log('res', res.data);
            return res.data as Promise<ICustomerCare[]>;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy đặt lịch');
    }
};
