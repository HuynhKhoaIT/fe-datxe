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

export const getCars = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.token) {
            const config = {
                headers: { Authorization: `Bearer ${session?.user?.token}` },
            };
            const res = await axios.get(`${GET_CAR_ENDPOINT}`, config);
            return res.data.data as Promise<ICar[]>;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin xe');
    }
};
