/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { GET_MY_ACCOUNT_ENDPOINT, POST_LOGIN_ENDPOINT, POST_REGISTER_ENDPOINT } from './constants/endpoints';

import { IUser } from '@/interfaces/user';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import ForgotPassword from '@/app/forgot-password/page';
/**
 * Get getMyAccount.
 *
 * @return {Promise<void>}
 */

export const getMyAccount = async () => {
    const session = await getServerSession(authOptions);
    try {
        if (session?.user?.token) {
            const config = {
                headers: { Authorization: `Bearer ${session?.user?.token}` },
            };
            const res = await axios.get(`${GET_MY_ACCOUNT_ENDPOINT}`, config);
            return res.data.data as Promise<IUser>;
        }
    } catch (error) {
        console.log(error);
        throw new Error('Lỗi lấy thông tin my-account');
    }
};

export const login = async (phone: string, password: string): Promise<void> => {
    try {
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

export const register = async (
    name: string,
    phone: string,
    email: String,
    license_plates: string,
    automaker_id: string,
    car_name_id: string,
    password: string,
    password_confirmation: string,
): Promise<void> => {
    try {
        const res = await axios.post(
            `${POST_REGISTER_ENDPOINT}`,
            {
                name: name,
                phone: phone,
                email: email,
                license_plates: license_plates,
                automaker_id: automaker_id,
                car_name_id: car_name_id,
                password: password,
                password_confirmation: password_confirmation,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (res.status === 200) {
            signIn('credentials', { phone: phone, password: password, callbackUrl: '/dashboard' });
            console.log('đăng ký thành công');
        } else {
            console.log('Regiter failed');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Đăng Ký thất bại');
    }
};
