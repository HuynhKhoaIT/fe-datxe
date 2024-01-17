/**
 * External Dependencies.
 */
import axios from "axios";
/**
 * Internal Dependencies.
 */
import {
  GET_PROVINCE_ENDPOINT,
  GET_DISTRICT_ENDPOINT,
  GET_WARD_ENDPOINT,
} from "./constants/endpoints";
import { IProduct } from "@/interfaces/product";
/**
 * Get getOrders.
 *
 * @return {Promise<void>}
 */

export const getProvinces = async () => {
  try {
    const res = await axios.get(`${GET_PROVINCE_ENDPOINT}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy tỉnh thành phố"); // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};
export const getDistricts = async (provinceId: string) => {
  try {
    const res = await axios.get(`${GET_DISTRICT_ENDPOINT}/${provinceId}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy huyện"); // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};

export const getWards = async (districtId: string) => {
  try {
    const res = await axios.get(`${GET_WARD_ENDPOINT}/${districtId}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy xã"); // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};
