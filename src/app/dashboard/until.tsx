import axios from "axios";
import { getOrders } from "../libs/prisma/order";

export async function getMyOrders() {
  try {
    const res = await getOrders(9, {});
    return res;
  } catch (error) {
    console.error("error: ", error);
  }
}

export const CreateCustomer = async (name: any, phone: any) => {
  try {
    const res = await axios.post(
      `/api/customer/default`,
      {
        fullName: name,
        phoneNumber: phone,
        cityId: 0,
        districtId: 0,
        wardId: 0,
        address: "",
        dob: "",
        description: "",
        sex: "MALE",
        garageId: process.env.GARAGE_DEFAULT,
        status: "PUBLIC",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res) {
      console.log(res);
    }
    return res.data;
  } catch (error) {
    console.error("error", error);
  }
};
