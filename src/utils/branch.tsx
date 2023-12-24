/**
 * External Dependencies.
 */
import axios from "axios";
/**
 * Internal Dependencies.
 */
import { GET_BRAND_ENDPOINT } from "./constants/endpoints";
import { IBrand } from "@/interfaces/brand";
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
    throw new Error("Lỗi trong quá trình lấy thông tin hãng xe"); // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};

export const getBrand = async (brandId: number) => {
  try {
    const res = await axios.get(`${GET_BRAND_ENDPOINT}/${brandId}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy thông tin hãng xe"); // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};

export const getModels = async (id: number) => {
  try {
    const res = await axios.get(`${GET_BRAND_ENDPOINT}/models/${id}`);
    return res.data.data as Promise<IBrand[]>;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy thông tin dòng xe"); // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};

export const getYears = async (id: number) => {
  try {
    const res = await axios.get(`${GET_BRAND_ENDPOINT}/years/${id}`);
    return res.data.data as Promise<IBrand[]>;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy thông tin năm sản xuất"); // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};
