/**
 * External Dependencies.
 */
import axios from 'axios';
/**
 * Internal Dependencies.
 */
import { GET_PRODUCT_ENDPOINT, GET_SERVICE_ENDPOINT, GET_PRODUCT_DETAIL } from './constants/endpoints';
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
        throw new Error('Lỗi trong quá trình lấy thông tin sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const getServices = async () => {
    try {
        const res = await axios.get(`${GET_SERVICE_ENDPOINT}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin dịch vụ'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const getProductsHot = async ({ limit = 8 }) => {
    try {
        const res = await axios.get(`${GET_PRODUCT_ENDPOINT}&limit=${limit}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const getServiceHot = async ({ limit = 8 }) => {
    try {
        const res = await axios.get(`${GET_SERVICE_ENDPOINT}&limit=${limit}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const getProductDetail = async (productId = 0) => {
    try {
        const res = await axios.get(`${GET_PRODUCT_DETAIL}/${productId}`);
        return res.data.data;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy thông tin chi tiết sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const getProductsByCat = async (catId = 0) => {
    try {
        const res = await axios.get(`${GET_PRODUCT_ENDPOINT}?cat_Id=${catId}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};
export const getProductsByName = async (name: string) => {
    try {
        const res = await axios.get(`${GET_PRODUCT_ENDPOINT}&${name}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};

export const getProductByGar = async (garageId = 0, limit = 8) => {
    try {
        const res = await axios.get(`${GET_PRODUCT_ENDPOINT}?Garage_id=${garageId}&limit=${limit}`);
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};
export const getProductsRelated = async (categoryId: string, garageId: string, limit: number) => {
    try {
        const res = await axios.get(
            `${GET_PRODUCT_ENDPOINT}?cat_id=${categoryId}&garage_id=${garageId}&limit=${limit}`,
        );
        return res.data.data as Promise<IProduct[]>;
    } catch (error) {
        console.error(error);
        throw new Error('Lỗi trong quá trình lấy danh sách sản phẩm'); // Xử lý lỗi và thông báo lỗi cho phía front-end
    }
};
getProductsRelated;
