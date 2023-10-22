// 'use client';

import { IOrder } from '@/interfaces/order';
import { getOrders, showStatus } from '@/utils/order';
import Link from 'next/link';
const Orders = async () => {
    const orders_data = await getOrders({ pageNo: 1 });
    return (
        <div className="user-profile-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <div className="user-profile-card">
                        <h4 className="user-profile-card-title">Danh sách đơn hàng</h4>
                        <div className="table-responsive">
                            <table className="table text-nowrap">
                                <thead>
                                    <tr>
                                        <th>Chuyên gia</th>
                                        <th>Tổng tiền</th>
                                        <th>Đã trả</th>
                                        <th>Số nợ</th>
                                        <th>Tình trạng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders_data?.map((order: IOrder) => (
                                        <tr>
                                            <td>
                                                <div className="table-list-info">
                                                    <Link href={`/dashboard/order/${order.id}`}>
                                                        <img src={`${order.thumbnail}`} alt="" />
                                                        <div className="table-ad-content">
                                                            <h6>{order.code}</h6>
                                                            <span>Car ID: #{order.customerId}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td>{order.subTotal}</td>
                                            <td>{order.total}</td>
                                            <td>{order.totalDiscount}</td>
                                            <td>
                                                <span className="badge badge-success">{showStatus(order.status)}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export { Orders };
