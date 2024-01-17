import { STATUS_PUBLIC, STATUS_DRAFT, STATUS_PENDING, STATUS_DELETE, IS_PRODUCT, IS_SERVICE } from './index';

export const statusOptions = [
    { value: STATUS_PUBLIC, label: 'Hoạt động', color: 'green' },
    { value: STATUS_PENDING, label: 'Tạm dừng', color: 'orange' },
    { value: STATUS_DRAFT, label: 'Nháp', color: 'yellow' },
    // { value: STATUS_DELETE, label: 'Xoá', color: 'red' },
];

export const kindProductOptions = [
    { value: IS_PRODUCT, label: 'Sản phẩm', color: 'green' },
    { value: IS_SERVICE, label: 'Dịch vụ', color: 'orange' },
];
