/**
 * External Dependencies.
 */
import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
/**
 * Internal Dependencies.
 */
import {
  GET_ORDER_ENDPOINT,
  GET_ORDER_DETAIL_ENDPOINT,
  GET_ORDER_GARAGE_ENDPOINT,
} from "./constants/endpoints";
import { IOrder } from "@/interfaces/order";
import { IOrderDetail } from "@/interfaces/orderDetail";
import { convertViToEn } from "./until";
/**
 * Get getOrders.
 *
 * @return {Promise<void>}
 */
export const getOrders = async (pageNo = 1) => {
  const session = await getServerSession(authOptions);
  if (session?.user?.token) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      };
      const res = await axios.get(
        `${GET_ORDER_ENDPOINT}?page=${pageNo}`,
        config
      );
      return res.data.data as Promise<IOrder[]>;
    } catch (error) {
      throw new Error("Lỗi trong quá trình lấy danh sách đơn hàng");
    }
  }
};

export const getOrdersOfGarage = async (garageId: number) => {
  const session = await getServerSession(authOptions);
  if (session?.user?.token) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      };
      const res = await axios.get(
        `${GET_ORDER_GARAGE_ENDPOINT}/${garageId}`,
        config
      );
      return res.data.data as Promise<IOrder[]>;
    } catch (error) {
      throw new Error(
        "Lỗi trong quá trình lấy danh sách đơn hàng của chuyên gia"
      );
    }
  }
};

export const getOrder = async (orderId = 0) => {
  const session = await getServerSession(authOptions);
  if (session?.user?.token && orderId != 0) {
    const config = {
      headers: { Authorization: `Bearer ${session?.user?.token}` },
    };
    const res = await axios.get(`${GET_ORDER_ENDPOINT}/${orderId}`, config);
    return res.data.data as Promise<IOrder>;
  }
};
export const getScheduleCsr = async (token: string) => {
  if (token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.get(`${GET_ORDER_ENDPOINT}`, config);
    return res.data.data as Promise<IOrder>;
  }
};
export const getSchedule = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.token) {
    const config = {
      headers: { Authorization: `Bearer ${session?.user?.token}` },
    };
    const res = await axios.get(`${GET_ORDER_ENDPOINT}`, config);
    return res.data.data as Promise<IOrder>;
  }
};

export const getOrderDetail = async (orderId = 0) => {
  const session = await getServerSession(authOptions);
  if (session?.user?.token && orderId != 0) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      };
      const res = await axios.get(
        `${GET_ORDER_DETAIL_ENDPOINT}/${orderId}`,
        config
      );
      return res.data.data as Promise<IOrderDetail[]>;
    } catch (error) {}
  }
};

export function showStatus(status: any) {
  let s = "Đang tiếp nhận";
  switch (status) {
    case "0":
      s = "Đang chờ";
      break;
    case "1":
      s = "Tiếp nhận";
      break;
    case "2":
      s = "Báo giá";
      break;
    case "3":
      s = "Đang sửa chữa";
      break;
    case "4":
      s = "Hoàn thành";
      break;    
    case "5":
      s = "Xuất xưởng";
      break;    
    case "-1":
      s = "Đã hủy";
      break;
    default:
      s = "Đang xử lý";
      break;
  }
  return s;
}

export const checkOutCart = async (
  carId: any,
  arrivalTime: string,
  cartData: object,
  token: string
) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = {
        car_id: carId,
        arrival_time: arrivalTime,
        items: cartData,
      };
      const res = await axios.post(`${GET_ORDER_ENDPOINT}`, data, config);
      return res.data.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình tạo thông tin xe");
  }
};

export const sendSMSOrder = async (order: any) => {
  try {
    let contentSMS = process.env.SMS_ORDER_RECEIVED;
    switch (Number(order.step)) {
      case 1:
        contentSMS = process.env.SMS_ORDER_RECEIVED
        break;
      case 4:
        contentSMS = process.env.SMS_ORDER_RECEIVED
        break;
      case -1:
        contentSMS = process.env.SMS_ORDER_CANCEL
        break;
    }
    contentSMS = contentSMS?.replaceAll('{order_code}',order?.code);
    return order;
    contentSMS = contentSMS?.replaceAll('{garage_short}',order?.garage.shortName);
    let dataSMS = {
      Phone: order.customer.phoneNumber,
      Content: contentSMS,
      ApiKey: process.env.SMS_APIKEY,
      SecretKey: process.env.SMS_SECRET,
      Brandname: process.env.SMS_BRANDNAME,
      SmsType: 2,
    };
    
    const { data } = await axios({
      method: "POST",
      url: `${process.env.SMS_SMS_MKT}`,
      data: dataSMS,
    });
    return data;
  } catch (error) {
    return error;
  }
};


