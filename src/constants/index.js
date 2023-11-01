export const apiUrl = process.env.REACT_APP_API;
export const apiTenantUrl = process.env.REACT_APP_API_TENANT;
export const apiTenantId = process.env.REACT_APP_TENANT_ID;
export const enableExposure = process.env.REACT_APP_ENABLE_EXPOSURE === 'true';
export const envType = process.env.REACT_APP_ENV;

export const fixedPath = {
    privacy: `${apiUrl}${process.env.REACT_APP_PRIVACY_PATH}`,
    help: `${apiUrl}${process.env.REACT_APP_HELP_PATH}`,
    aboutUs: `${apiUrl}${process.env.REACT_APP_ABOUT_US_PATH}`,
};

export const brandName = 'CMS';

export const appName = 'cms-elms-app';

export const storageKeys = {
    USER_ACCESS_TOKEN: `${appName}-user-access-token`,
    USER_REFRESH_TOKEN: `${appName}-user-refresh-token`,
    USER_KIND: `${appName}-user-kind`,
    TENANT_ID: `${appName}-tenant-id`,
    RESTAURANT_ID: `${appName}-restaurant-id`,
    TENANT_HEADER: `X-tenant`,
    TENANT_API_URL: `${appName}-tenant-api-url`,
};

export const baseHeader = {
    'Content-Type': 'application/json',
};

export const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

export const AppConstants = {
    apiRootUrl: process.env.REACT_APP_API,
    apiTenantRootUrl: process.env.REACT_APP_API_TENANT,
    contentRootUrl: `${process.env.REACT_APP_API_MEDIA}v1/file/download`,
    mediaRootUrl: `${process.env.REACT_APP_API_MEDIA}`,
    langKey: 'vi',
};

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
};

export const defaultLocale = 'en';
export const locales = ['en', 'vi'];

export const activityType = {
    GAME: 'game',
    VIDEO: 'video',
    ARTICLE: 'article',
    FOCUS_AREA: 'focus-area',
};

export const DATE_DISPLAY_FORMAT = 'DD-MM-YYYY HH:mm';
export const DATE_SHORT_MONTH_FORMAT = 'DD MMM YYYY';
export const TIME_FORMAT_DISPLAY = 'HH:mm';
export const DATE_FORMAT_VALUE = 'DD/MM/YYYY';
export const DATE_FORMAT_DISPLAY = 'DD/MM/YYYY';
export const DEFAULT_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const navigateTypeEnum = {
    PUSH: 'PUSH',
    POP: 'POP',
    REPLACE: 'REPLACE',
};

export const articleTypeEnum = {
    URL: 'url',
    PLAIN: 'plain',
};

export const accessRouteTypeEnum = {
    NOT_LOGIN: false,
    REQUIRE_LOGIN: true,
    BOTH: null,
};

export const UploadFileTypes = {
    AVATAR: 'AVATAR',
    LOGO: 'LOGO',
    DOCUMENT: 'DOCUMENT',
};

export const LIMIT_IMAGE_SIZE = 512000;

export const STATUS_PENDING = 0;
export const STATUS_ACTIVE = 1;
export const STATUS_INACTIVE = -1;
export const STATUS_DELETE = -2;

export const STATE_ORDER_PENDING = 0;
export const STATE_ORDER_DONE = 1;
export const STATE_ORDER_CANCEL = -1;
export const ORDER_TYPE_PICK_UP = 1;
export const ORDER_TYPE_DELIVER = 2;
export const PAYMENT_TYPE_CASH = 'OFFLINE_CASH';
export const PAYMENT_TYPE_CARD = 'OFFLINE_CARD';
export const PAYMENT_TYPE_ONLINE_PAYPAL = 'ONLINE_PAYPAL';
export const STATE_COURSE_PREPARED = 1;
export const STATE_COURSE_STARTED = 2;
export const STATE_COURSE_FINISHED = 3;
export const STATE_COURSE_CANCELED = 4;
export const STATE_COURSE_RECRUITED = 5;

export const STATE_TASK_ASIGN = 1;
export const STATE_TASK_DONE = 2;

export const STATE_PROJECT_TASK_CREATE = 1;
export const STATE_PROJECT_TASK_PROCESSING = 2;
export const STATE_PROJECT_TASK_DONE = 3;
export const STATE_PROJECT_TASK_CANCEL = 4;

export const DEFAULT_TABLE_ITEM_SIZE = 20;
export const DEFAULT_TABLE_PAGE_START = 0;
export const DEFAULT_GET_ALL_LIST = 1000;
export const DEFAULT_TIME = '01/01/2023 00:00:00';
export const commonStatus = {
    PENDING: 0,
    ACTIVE: 1,
    INACTIVE: -1,
    DELETE: -2,
};

export const UserTypes = {
    ADMIN: 1,
    MANAGER: 2,
    STUDENT: 3,
    LEADER: 4,
    COMPANY: 5,
};

export const LEADER_LOGIN_TYPE = 'leader';
export const ADMIN_LOGIN_TYPE = 'password';
export const STUDENT_LOGIN_TYPE = 'student';
export const COMPANY_LOGIN_TYPE = 'company';

export const loginOptions = [
    { label: 'Admin', value: ADMIN_LOGIN_TYPE },
    { label: 'Sinh viên', value: STUDENT_LOGIN_TYPE },
    { label: 'Leader', value: LEADER_LOGIN_TYPE },
    { label: 'Công ty', value: COMPANY_LOGIN_TYPE },
];

export const commonStatusColor = {
    [commonStatus.PENDING]: 'warning',
    [commonStatus.ACTIVE]: 'green',
    ['-1']: 'red',
};

export const appAccount = {
    APP_USERNAME: process.env.REACT_APP_USERNAME,
    APP_PASSWORD: process.env.REACT_APP_PASSWORD,
};

export const COMMON_PROTOCOL = 'jdbc:mysql://'; // using for connection string

export const CATEGORY_KIND_GENERATION = 2;
const CATEGORY_KIND_EDUCATION = 1;
const CATEGORY_KIND_JOBS = 2;
const CATEGORY_KIND_DEPARTMENTS = 3;
export const CATEGORY_KIND_MAJOR = 3;
const CATEGORY_KIND_NEWS = 4;
const CATEGORY_KIND_SERVICE = 5;
const CATEGORY_KIND_KNOWLEDGE = 8;
export const categoryKinds = {
    CATEGORY_KIND_NEWS,
    CATEGORY_KIND_JOBS,
    CATEGORY_KIND_DEPARTMENTS,
    CATEGORY_KIND_EDUCATION,
    CATEGORY_KIND_SERVICE,
    CATEGORY_KIND_KNOWLEDGE,
    CATEGORY_KIND_GENERATION,
    CATEGORY_KIND_MAJOR,
};

const GROUP_KIND_ADMIN = 1;
const GROUP_KIND_ORG = 2;
const GROUP_KIND_CUSTOMER = 3;
const GROUP_KIND_EMPLOYEE = 4;

export const groupPermissionKinds = {
    ADMIN: GROUP_KIND_ADMIN,
    ORG: GROUP_KIND_ORG,
    CUSTOMER: GROUP_KIND_CUSTOMER,
    EMPLOYEE: GROUP_KIND_EMPLOYEE,
};

export const groupPermissionKindsOptions = [
    { label: 'Admin', value: GROUP_KIND_ADMIN },
    { label: 'Org', value: GROUP_KIND_ORG },
    { label: 'Customer', value: GROUP_KIND_CUSTOMER },
    { label: 'Employee', value: GROUP_KIND_EMPLOYEE },
];

export const CurrentcyPositions = {
    FRONT: 0,
    BACK: 1,
};

export const chart31DaysData = [
    {
        date: '1',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '2',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '3',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '4',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '5',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '6',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '7',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '8',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '9',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '10',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '11',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '12',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '13',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '14',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '15',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '16',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '17',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '18',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '19',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '20',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '21',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '22',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '23',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '24',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '25',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '26',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '27',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '28',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '29',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '30',
        cancel: 0,
        done: 0,
        pending: 0,
    },
    {
        date: '31',
        cancel: 0,
        done: 0,
        pending: 0,
    },
];
export const formSize = {
    small: '600px',
    normal: '700px',
    big: '900px',
};

export const LECTURE_SECTION = 1;
export const LECTURE_LESSION = 2;

export const REGISTRATION_MONEY_RECEIVED = 1;
export const REGISTRATION_MONEY_RETURN = 2;

export const TASK_LOG_WORKING = 1;
export const TASK_LOG_OFF = 100;

export const COMPANY_SEEK_STATE_LOOKING = 1;
export const COMPANY_SEEK_STATE_ACCEPT = 2;