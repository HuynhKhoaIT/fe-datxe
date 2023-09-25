/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { GET_CATEGORY_ENDPOINT } from './constants/endpoints';
import { ICategory } from '@/interfaces/category';
/**
 * Get getOrders.
 *
 * @return {Promise<void>}
 */
export const getCategories = async () => {
    try {
        const res = await axios.get(`${GET_CATEGORY_ENDPOINT}`);
        return res.data.data as Promise<ICategory[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông danh mục');
    }
};

export const getCategoriesByGar = async (garageId = 0) => {
    try {
        const res = await axios.get(`${GET_CATEGORY_ENDPOINT}?Garage_id=${garageId}`);
        return res.data.data as Promise<ICategory[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách danh mục theo garage');
    }
};
