/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { GET_MY_ACCOUNT_ENDPOINT } from './constants/endpoints';
import { IUser } from '@/interfaces/user';
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
