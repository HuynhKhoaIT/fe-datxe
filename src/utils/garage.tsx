/**
 * External Dependencies.
 */
import axios from "axios";
/**
 * Internal Dependencies.
 */
import {
  GET_CVDV_ENDPOINT,
  GET_EMPLOYEES_ENDPOINT,
  GET_GARAGE_ENDPOINT,
} from "./constants/endpoints";
import { IGarage } from "@/interfaces/garage";
/**
 * Get getOrders.
 *
 * @return {Promise<void>}
 */
export const getGarages = async () => {
  try {
    const res = await axios.get(`${GET_GARAGE_ENDPOINT}`);
    return res.data as Promise<IGarage[]>;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy danh sách chuyên gia"); // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};

export const getGarage = async (id: string) => {
  try {
    const res = await axios.get(`${GET_GARAGE_ENDPOINT}/${id}`);
    return res.data as Promise<IGarage>;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy chuyên gia");
    // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};

export const getGaragesNear = async ({ limit = 8 }) => {
  try {
    const res = await axios.get(`${GET_GARAGE_ENDPOINT}?limit=${limit}`);
    return res.data as Promise<IGarage[]>;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy danh sách chuyên gia"); // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};

export const getEmployees = async (id: string) => {
  try {
    const res = await axios.get(`${GET_CVDV_ENDPOINT}?garage_id=${id}`);
    return res.data.data as Promise<any>;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy danh sách CVDV"); // Xử lý lỗi và thông báo lỗi cho phía front-end
  }
};

export const createQrCodeGarage = async(data:any) => {
  try {
    
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình Tạo Qr Code");
  }
}
