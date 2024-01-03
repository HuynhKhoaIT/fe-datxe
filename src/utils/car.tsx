/**
 * External Dependencies.
 */
import axios from "axios";
/**
 * Internal Dependencies.
 */
import { GET_CAR_ENDPOINT, SET_CAR_DEFAULT } from "./constants/endpoints";
import { ICar } from "@/interfaces/car";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
/**
 * Get getCars.
 *
 * @return {Promise<void>}
 */

export const getCars = async (token: string) => {
  // const session = await getServerSession(authOptions);
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`${GET_CAR_ENDPOINT}`, config);
      return res.data.data as Promise<ICar[]>;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy thông tin xe");
  }
};

export const getCarsSsr = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.token) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      };
      const res = await axios.get(`${GET_CAR_ENDPOINT}`, config);
      return res.data.data as Promise<ICar[]>;
    } catch (error) {
      console.error(error);
      throw new Error("Lỗi trong quá trình lấy thông tin xe");
    }
  }
};

export const getCar = async (token: string, carId: string) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`${GET_CAR_ENDPOINT}/${carId}`, config);
      return res.data.data as Promise<ICar[]>;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy thông tin xe");
  }
};
export const getCarSsr = async (carId: number) => {
  const session = await getServerSession(authOptions);
  try {
    if (session?.user?.token) {
      const config = {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      };
      const res = await axios.get(`${GET_CAR_ENDPOINT}/${carId}`, config);
      return res.data.data as Promise<ICar[]>;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy thông tin xe");
  }
};

export const addCar = async (newCar: Object, token: String) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(`${GET_CAR_ENDPOINT}`, newCar, config);
      return res.data.data as ICar;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình tạo thông tin xe");
  }
};

export const deleteCar = async (carId: string, token: string) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.delete(`${GET_CAR_ENDPOINT}/${carId}`, config);
      return res.data.data as ICar;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình xóa thông tin xe");
  }
};

export const updateCar = async (
  carId: string,
  updatedCarData: any,
  token: string
) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.put(
        `${GET_CAR_ENDPOINT}/${carId}`,
        updatedCarData,
        config
      );
      return res.data.data as ICar;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình cập nhật thông tin xe");
  }
};

export const setCarDefault = async (carId: string, token: String) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(
        `${SET_CAR_DEFAULT}`,
        { carId: carId },
        config
      );
      return res.data.data as ICar;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình tạo xe mặc định");
  }
};
