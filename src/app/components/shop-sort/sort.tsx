import { Select } from 'antd';
import React from 'react';

const { Option } = Select;
export async function Sort({ lengthData }: { lengthData: number }) {
    return (
        <div className="shop-sort">
            <h5>Hiển thị 8 sản phẩm trong {lengthData} sản phẩm</h5>
            <div>
                <Select defaultValue={'Sắp xếp theo mặc định'}>
                    <Option value="1">Sắp xếp theo mặc định</Option>
                    <Option value="5">Sắp xếp theo nổi bật</Option>
                    <Option value="2">Sắp xếp theo mới nhất</Option>
                    <Option value="3">Sắp xếp theo giá thấp</Option>
                    <Option value="4">Sắp xếp theo giá cao</Option>
                </Select>
            </div>
        </div>
    );
}
