/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import {
    GET_PRODUCT_ENDPOINT,
    GET_PRODUCTS_ENDPOINT,
    GET_SERVICE_ENDPOINT,
    GET_PRODUCT_DETAIL,
} from './constants/endpoints';
import { IProduct } from '@/interfaces/product';
/**
 * Get getOrders.
 *
 * @return {Promise<void>}
 */

export const getProducts = async () => {
    try {
        const res = await axios.get(`${GET_PRODUCT_ENDPOINT}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin sản phẩm');
    }
};

export const getProductDetail = async (productId = 0) => {
    try {
        const res = await axios.get(`${GET_PRODUCT_DETAIL}/${productId}`);
        return res.data.data;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin chi tiết sản phẩm');
    }
};

export const getProductsHot = async ({ limit = 8 }) => {
    try {
        const res = await axios.get(`${GET_PRODUCT_ENDPOINT}&limit=${limit}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin sản phẩm');
    }
};

export const getProductsRelated = async (categoryId: string = '', garageId: string = '', limit: number) => {
    try {
        const res = await axios.get(
            `${GET_PRODUCT_ENDPOINT}?cat_id=${categoryId}&garage_id=${garageId}&limit=${limit}`,
        );
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm');
    }
};

export const getProductByGar = async (garageId: string, limit = 8) => {
    console.log('getProductByGar');
    try {
        let url = `${GET_PRODUCTS_ENDPOINT}?garage_id=${garageId}&limit=${limit}`;
        console.log(url);
        const res = await axios.get(url);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm');
    }
};

export const getProductsSearch = async (search: string) => {
    try {
        const res = await axios.get(`${GET_PRODUCT_ENDPOINT}&${search}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm');
    }
};
