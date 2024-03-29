import {
    STATUS_PUBLIC,
    STATUS_DRAFT,
    STATUS_PENDING,
    STATUS_DELETE,
    IS_PRODUCT,
    IS_SERVICE,
    MALE,
    FEMALE,
    COMPANY,
    OTHER,
    ORDER_ACCEPT,
    ORDER_QUOTE,
    ORDER_REPAIR,
    ORDER_DONE,
    ORDER_FINISH,
    ORDER_CANCEL,
    MARKETING_CANCEL,
    MARKETING_ALL,
    MARKETING_COMING,
    MARKETING_PENDING,
    ORDER_PENDING,
} from './index';

export const statusOptions = [
    { value: STATUS_PUBLIC, label: 'Hoạt động', color: 'green' },
    { value: STATUS_PENDING, label: 'Tạm dừng', color: 'orange' },
    { value: STATUS_DRAFT, label: 'Nháp', color: 'yellow' },
    // { value: STATUS_DELETE, label: 'Xoá', color: 'red' },
];

export const kindProductOptions = [
    { value: IS_PRODUCT, label: 'Sản phẩm', color: 'green' },
    { value: IS_SERVICE, label: 'Dịch vụ', color: 'blue' },
];

export const sexOptions = [
    { value: MALE, label: 'Nam', color: 'green' },
    { value: FEMALE, label: 'Nữ', color: 'orange' },
    { value: COMPANY, label: 'Công ty', color: 'orange' },
    { value: OTHER, label: 'Khác', color: 'orange' },
];

export const stepOrderOptions = [
    { value: ORDER_PENDING, label: 'Đang chờ', color: 'pink' },
    { value: ORDER_ACCEPT, label: 'Tiếp nhận', color: 'blue' },
    { value: ORDER_QUOTE, label: 'Báo giá', color: 'yellow' },
    { value: ORDER_REPAIR, label: 'Đang sửa chữa', color: 'orange' },
    { value: ORDER_DONE, label: 'Hoàn thành', color: 'green' },
    { value: ORDER_FINISH, label: 'Xuất Xưởng', color: 'cyan' },
    { value: ORDER_CANCEL, label: 'Đã huỷ', color: 'red' },
];

export const kindMarketingOptions = [
    { value: MARKETING_ALL, label: 'Tất cả', color: 'green' },
    { value: MARKETING_COMING, label: 'Sắp diễn ra', color: 'orange' },
    { value: MARKETING_PENDING, label: 'Đang diễn ra', color: 'blue' },
    { value: MARKETING_CANCEL, label: 'Đã kết thúc', color: 'red' },
];

export const FieldTypes = {
    STRING: 'STRING_TYPE',
    NUMBER: 'NUMBER_TYPE',
    SELECT: 'SELECT',
    AUTOCOMPLETE: 'AUTOCOMPLETE',
    DATE: 'DATE',
    DATE_RANGE: 'DATE_RANGE',
};
