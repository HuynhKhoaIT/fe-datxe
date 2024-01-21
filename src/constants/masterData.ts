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
    { value: ORDER_ACCEPT, label: 'Tiếp nhận', color: 'blue' },
    { value: ORDER_QUOTE, label: 'Báo giá', color: 'yellow' },
    { value: ORDER_REPAIR, label: 'Đang sửa chữa', color: 'orange' },
    { value: ORDER_DONE, label: 'Hoàn thành', color: 'cyan' },
    { value: ORDER_FINISH, label: 'Xuất Xưởng', color: 'green' },
    { value: ORDER_CANCEL, label: 'Đã huỷ', color: 'red' },
];
