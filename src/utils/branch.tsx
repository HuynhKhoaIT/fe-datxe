/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { GET_BRAND_ENDPOINT } from './constants/endpoints';
import { IBrand } from '@/interfaces/brand';
/**
 * Get getBrands.
 *
 * @return {Promise<void>}
 */

export const getBrands = async () => {
    try {
        const res = await axios.get(`${GET_BRAND_ENDPOINT}`);
        return res.data.data as Promise<IBrand[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin hãng xe'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};
