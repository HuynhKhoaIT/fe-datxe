'use client';
import { IOrderDetail } from '@/interfaces/orderDetail';
import React from 'react';
export default function OrderDetailItem({ items = [] }: { items: IOrderDetail }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Hình</th>
                    <th>Tên</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                </tr>
            </thead>
            <tbody>
                {items.map((orderItem: IOrderDetail) => (
                    <tr>
                        <td>
                            <img
                                src={orderItem.thumbnail}
                                alt={orderItem.name}
                                className="img-thumbnail img-fluid"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                        </td>
                        <td>{orderItem.name}</td>
                        <td>{orderItem.quantity}</td>
                        <td>{orderItem.sellPrice?.toLocaleString()}đ</td>
                        <td>{orderItem.total?.toLocaleString()}đ </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
