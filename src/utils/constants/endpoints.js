export const GET_ORDER_ENDPOINT = `${process.env.apiUser}/orders`;
export const GET_ORDER_DETAIL_ENDPOINT = `${process.env.apiUser}/order-detail`;
export const GET_PRODUCTS_ENDPOINT = `${process.env.apiGuest}/products`;
export const GET_PRODUCT_ENDPOINT = `${process.env.apiGuest}/products?is_product=1`;
export const GET_SERVICE_ENDPOINT = `${process.env.apiGuest}/products?is_product=0`;
export const GET_MY_ACCOUNT_ENDPOINT = `${process.env.apiUser}/my-account`;
export const GET_CATEGORY_ENDPOINT = `${process.env.apiGuest}/product-category`;
export const GET_GARAGE_ENDPOINT = `${process.env.apiGuest}/garages`;
export const POST_LOGIN_ENDPOINT = `${process.env.api}/login`;
export const POST_REGISTER_ENDPOINT = `${process.env.api}/register`;
export const POST_GARAGE_REGISTER_ENDPOINT = `${process.env.api}/create-garage-account`;
export const GET_BRAND_ENDPOINT = `${process.env.apiGuest}/car-brands`;
export const GET_PRODUCT_DETAIL = `${process.env.apiGuest}/products`;
export const GET_CAR_ENDPOINT = `${process.env.apiUser}/cars`;
export const CUSTOMER_CARE_ENDPOINT = `${process.env.apiUser}/customer-care`;
export const CHECK_PHONE_NUMBER = `${process.env.apiGuest}/check-phone-number`;
export const CHECK_OTP = `${process.env.apiGuest}/check-otp`;
export const SET_CAR_DEFAULT = `${process.env.apiUser}/user/set-car-default`;
export const CUSTOMER_CARE_ENDPOINT_GUEST = `${process.env.apiGuest}/customer-care`;
export const GET_EMPLOYEES_ENDPOINT = `${process.env.apiGuest}/employees`;
export const GET_CVDV_ENDPOINT = `${process.env.apiGuest}/cvdv`;

export const GET_PROVINCE_ENDPOINT = `${process.env.apiGuest}/provinces`;
export const GET_DISTRICT_ENDPOINT = `${process.env.apiGuest}/get-districts`;
export const GET_WARD_ENDPOINT = `${process.env.apiGuest}/get-wards`;
export const GET_PROFILE_ENDPOINT = `${process.env.apiUserV3}/my-account`;
export const GET_ORDER_GARAGE_ENDPOINT = `${process.env.apiUserV3}/orders/get-by-garage`;

// DLBD
export const GET_CUSTOMERS_DLBD_ENDPOINT = `${process.env.apiUserV3}/customers`;
export const GET_PRODUCTS_DLBD_ENDPOINT = `${process.env.apiUserV3}/products`;
export const GET_CARS_DLBD_ENDPOINT = `${process.env.apiUserV3}/cars`;
export const GET_CARS_DLBD_GUEST = `${process.env.apiUserV3}/cars`;
export const GET_PRODUCTS_DLBD_GUEST = `${process.env.apiUserV3}/products`;
