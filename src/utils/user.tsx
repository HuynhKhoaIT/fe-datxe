/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { GET_MY_ACCOUNT_ENDPOINT, POST_LOGIN_ENDPOINT } from './constants/endpoints';

import { IUser } from '@/interfaces/user';
import ForgotPassword from '@/app/forgot-password/page';
/**
 * Get getMyAccount.
 *
 * @return {Promise<void>}
 */

export const getMyAccount = async (token: string) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(`${GET_MY_ACCOUNT_ENDPOINT}`, config);
        return res.data.data as Promise<IUser>;
    } catch (error) {
        console.log(error);
        throw new Error('Lỗi lấy thông tin my-account');
    }
};

export const login = async (phone: string, password: string): Promise<void> => {
    try {
        console.log('phone', phone);
        console.log(typeof phone);
        console.log('password', password);
        const res = await axios.post(
            `${POST_LOGIN_ENDPOINT}`,
            {
                phone: phone,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log('11111111111111111111');
        console.log(res);

        if (res.status === 200) {
            // Login was successful
            const data = res.data;
            localStorage.setItem('token', data.token);
        } else {
            // Login failed
            console.log('Login failed');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Đăng nhập thất bại');
    }
};
