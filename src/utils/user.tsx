/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import {
    GET_MY_ACCOUNT_ENDPOINT,
    POST_LOGIN_ENDPOINT,
    POST_REGISTER_ENDPOINT,
    CHECK_PHONE_NUMBER,
    CHECK_OTP,
} from './constants/endpoints';

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

export const getMyAccount = async (token: String) => {
    // const session = await getServerSession(authOptions);
    try {
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
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
    password: string,
    password_confirmation: string,
): Promise<void> => {
    try {
        const res = await axios.post(
            `${POST_REGISTER_ENDPOINT}`,
            {
                name: name,
                phone: phone,
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

export const CheckPhone = async (phone: string) => {
    try {
        console.log('phone', phone);
        const res = await axios.get(`${CHECK_PHONE_NUMBER}/${phone}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 200) {
            // const data = res;
            return res.data;
        } else {
            console.log('Login failed');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Đăng nhập thất bại');
    }
};
export const CheckOtp = async (phone: string, otp: string, action: string) => {
    try {
        const res = await axios.post(
            `${CHECK_OTP}`,
            {
                phone: phone,
                otp: otp,
                action: action,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        if (res.status === 200) {
            // const data = res;
            return res.data;
        } else {
            console.log('Login failed');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Đăng nhập thất bại');
    }
};
