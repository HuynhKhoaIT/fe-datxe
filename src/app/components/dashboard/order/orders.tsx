// 'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getOrders, showStatus } from '@/utils/order';
import { IOrder } from '@/interfaces/order';
import { useSession } from 'next-auth/react';

const Orders = async () => {
    const orders_data = await getOrders({
        token: '1436|5ZgrHyobWoDHP4gS3PtWm2vVcMWNDgeFZk2p4DzY',
    });
    return (
        <div className="user-profile-wrapper">
            <div className="row">
                <div className="col-md-6 col-lg-4">
                    <div className="dashboard-widget dashboard-widget-color-1">
                        <div className="dashboard-widget-info">
                            <h1>450</h1>
                            <span>Active Listing</span>
                        </div>
                        <div className="dashboard-widget-icon">
                            <i className="fal fa-list"></i>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="dashboard-widget dashboard-widget-color-2">
                        <div className="dashboard-widget-info">
                            <h1>18.6k</h1>
                            <span>Total Views</span>
                        </div>
                        <div className="dashboard-widget-icon">
                            <i className="fal fa-eye"></i>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="dashboard-widget dashboard-widget-color-3">
                        <div className="dashboard-widget-info">
                            <h1>1560</h1>
                            <span>Total Listing</span>
                        </div>
                        <div className="dashboard-widget-icon">
                            <i className="fal fa-layer-group"></i>
                        </div>
                    </div>
                </div>
            </div>
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
