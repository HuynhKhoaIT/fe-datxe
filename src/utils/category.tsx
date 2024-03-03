/**
 * External Dependencies.
 */
import axios from "axios";
/**
 * Internal Dependencies.
 */
import { GET_CATEGORY_ENDPOINT } from "./constants/endpoints";
import { ICategory } from "@/interfaces/category";
import { ICategoryDLBD } from "@/interfaces/categoryDLBD";
/**
 * Get getOrders.
 *
 * @return {Promise<void>}
 */
export const getCategories = async () => {
  try {
    const res = await axios.get(`${GET_CATEGORY_ENDPOINT}`);
    return res.data.data as Promise<ICategory[]>;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy thông danh mục");
  }
};

export const getCategoriesByGarageId = async (garageId: string) => {
  try {
    const res = await axios.get(
      `${GET_CATEGORY_ENDPOINT}?garage_id=${garageId}`
    );
    return res.data.data as Promise<ICategory[]>;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy danh sách danh mục theo garage");
  }
};
export const getCategoriesFromDLBD = async (garageId: number) => {
  try {
    const res = await axios.get(
      `https://v2.dlbd.vn/api/v3/guest/product-category?garage_id=${garageId}`
    );
    return res.data.data as Promise<ICategoryDLBD[]>;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi trong quá trình lấy danh sách danh mục theo garage");
  }
};
