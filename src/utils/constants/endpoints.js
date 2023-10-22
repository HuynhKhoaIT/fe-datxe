export const GET_ORDER_ENDPOINT = `${process.env.apiUser}/orders`;
export const GET_ORDER_DETAIL_ENDPOINT = `${process.env.apiUser}/order-detail`;
export const GET_PRODUCT_ENDPOINT = `${process.env.apiGuest}/products?is_product=1`;
export const GET_SERVICE_ENDPOINT = `${process.env.apiGuest}/products?is_product=0`;
export const GET_MY_ACCOUNT_ENDPOINT = `${process.env.apiUser}/my-account`;
export const GET_CATEGORY_ENDPOINT = `${process.env.apiGuest}/product-category`;
export const GET_GARAGE_ENDPOINT = `${process.env.apiGuest}/garages`;
export const POST_LOGIN_ENDPOINT = `${process.env.api}/login`;
export const POST_REGISTER_ENDPOINT = `${process.env.api}/register`;
export const GET_BRAND_ENDPOINT = `${process.env.apiGuest}/car-brands`;
export const GET_PRODUCT_DETAIL = `${process.env.apiGuest}/products`;
export const GET_CAR_ENDPOINT = `${process.env.apiUser}/cars`;
