export const apiUrl = process.env.REACT_APP_API;
export const envGoogleMapAPIKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export const DATE_DISPLAY_FORMAT = 'hh:mm A DD/MM/YYYY';
export const DATE_SHORT_MONTH_FORMAT = 'DD MMM YYYY';
export const DATE_SHORT_MONTH_TIME_FORMAT = 'DD MMM YYYY HH:mm';
export const TIME_FORMAT_DISPLAY = 'HH:mm';
export const DATE_FORMAT_DISPLAY = 'DD/MM/YYYY';

export const STATUS_PUBLIC = 'PUBLIC';
export const STATUS_DRAFT = 'DRAFT';
export const STATUS_PENDING = 'PENDING';
export const STATUS_DELETE = 'DELETE';

export const IS_PRODUCT = 'true';
export const IS_SERVICE = 'false';
export const MALE = 'MALE';
export const FEMALE = 'FEMALE';
export const COMPANY = 'COMPANY';
export const OTHER = 'OTHER';

export const ORDER_PENDING = '0';
export const ORDER_CANCEL = '-1';
export const ORDER_ACCEPT = '1';
export const ORDER_QUOTE = '2';
export const ORDER_REPAIR = '3';
export const ORDER_DONE = '4';
export const ORDER_FINISH = '5';

export const MARKETING_CANCEL = '0';
export const MARKETING_PENDING = '1';
export const MARKETING_COMING = '2';
export const MARKETING_ALL = '3';
export const QUERY_KEY = {
    products: 'products',
    categories: 'categories',
    blogs: 'blogs',
    orders: 'orders',
    cars: 'cars',
    customers: 'customers',
    experts: 'experts',
    marketing: 'marketing',

    optionsProvince: 'optionsProvince',
    optionsDistrict: 'optionsDistrict',
    optionsWard: 'optionsWard',
    optionsultilities: 'optionsultilities',
    optionsBrandCar: 'optionsBrandCar',
    optionsModelCar: 'optionsModelCar',
    optionsYearCar: 'optionsYearCar',

    optionsNumberPlate: 'optionsNumberPlate',
    optionsCategory: 'optionsCategory',

    optionsCustomer: 'optionsCustomer',
    carsDlbd: 'carsDlbd',
    productsDlbd: 'productsDlbd',
    customersDlbd: 'customersDlbd',
    categoriesDlbd: 'categoriesDlbd',
};
