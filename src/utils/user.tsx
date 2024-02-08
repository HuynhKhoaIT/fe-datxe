/**
 * External Dependencies.
 */
import axios from "axios";
/**
 * Internal Dependencies.
 */
import {
  GET_MY_ACCOUNT_ENDPOINT,
  POST_LOGIN_ENDPOINT,
  POST_REGISTER_ENDPOINT,
  CHECK_PHONE_NUMBER,
  CHECK_OTP,
  GET_PROFILE_ENDPOINT,
} from "./constants/endpoints";

import { IUser } from "@/interfaces/user";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import ForgotPassword from '@/app/forgot-password/page';
/**
 * Get getMyAccount.
 *
 * @return {Promise<void>}
 */


export async function getUserByValidSessionToken(token : string){

  const res = await fetch(GET_PROFILE_ENDPOINT,{
    headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+token
    },
  });

  const data = await res.json();
  return {
    username: data.name
  }
}

export const getMyAccount = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.token) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${session.user.token}` },
      };
      const res = await axios.get(`${GET_PROFILE_ENDPOINT}`, config);
      return res.data.data as Promise<IUser>;
    } catch (error) {
      console.log(error);
      throw new Error("Lỗi lấy thông tin my-account");
    }
  }
};

export const login = async (phone: string, password: string): Promise<void> => {
  try {
    const res = await axios.post(
      `${POST_LOGIN_ENDPOINT}`,
      {
        phone: phone,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      // Login was successful
      const data = res.data;
      localStorage.setItem("token", data.token);
    } else {
      // Login failed
    }
  } catch (error) {
    console.error(error);
    throw new Error("Đăng nhập thất bại");
  }
};

export const register = async (
  name: string,
  phone: string,
  password: string,
  password_confirmation: string
): Promise<void> => {
  try {
    const res = await axios.post(
      `${POST_REGISTER_ENDPOINT}`,
      {
        name: name,
        phone: phone,
        password: password,
        password_confirmation: password_confirmation,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      signIn("credentials", {
        phone: phone,
        password: password,
        callbackUrl: "/dashboard",
      });
    } else {
      console.log("Regiter failed");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Đăng Ký thất bại");
  }
};

export const GenOTP = async (phone: string) => {
  try {
    const res = await axios.post(
      `/api/sms/send-otp`,
      {
        phone: phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("GEN OTP thất bại");
  }
};

export const CheckPhone = async (phone: string) => {
  try {
    console.log("phone", phone);
    const res = await axios.get(`${CHECK_PHONE_NUMBER}/${phone}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      // const data = res;
      return res.data;
    } else {
      console.log("Login failed");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Đăng nhập thất bại");
  }
};
export const CheckOtp = async (phone: string, otp: string, action: string) => {
  try {
    const res = await axios.post(
      `/api/sms/check-otp`,
      {
        phone: phone,
        code: otp,
        action: action,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      // const data = res;
      return res.data;
    } else {
      console.log("Check OTP failed");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Check OTP thất bại");
  }
};
export const updateAccount = async (profileData: any, token: string) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.put(
        `${GET_PROFILE_ENDPOINT}`,
        profileData,
        config
      );
      return res.data.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình cập nhật profiles");
  }
};
