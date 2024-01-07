import { STATUS_ACTIVE, STATUS_LOCK, STATUS_PENDING, STATUS_DELETE } from './index';

export const statusOptions = [
    { value: STATUS_ACTIVE, label: 'Hoạt động', color: 'green' },
    { value: STATUS_PENDING, label: 'Tạm dừng', color: 'warning' },
    { value: STATUS_LOCK, label: 'Khoá', color: 'red' },
    { value: STATUS_DELETE, label: 'Xoá', color: 'red' },
];
