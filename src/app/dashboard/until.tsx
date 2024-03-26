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
