'use client';

import { IOrderDetail } from '@/interfaces/orderDetail';
import { getOrder, getOrderDetail, showStatus } from '@/utils/order';

export default async function SingleOrder({ params }: { params: { slug: number } }) {
    const items = await getOrderDetail(params.slug, '1436|5ZgrHyobWoDHP4gS3PtWm2vVcMWNDgeFZk2p4DzY');
    const order = await getOrder(params.slug, '1436|5ZgrHyobWoDHP4gS3PtWm2vVcMWNDgeFZk2p4DzY');
    return (
        <main className="main">
            <div className="order-item-single bg pt-60">
                <div className="container">
                    <div className="card text-left mb-40">
                        <div className="card-body">
                            <div className="row invoice-info">
                                <div className="col-sm-4 invoice-col">
                                    THÔNG TIN CHUYÊN GIA
                                    <div>
                                        <strong>Admin, Inc.</strong>
                                        <br />
                                        795 Folsom Ave, Suite 600
                                        <br />
                                        San Francisco, CA 94107
                                        <br />
                                        Phone: (804) 123-5432
                                        <br />
                                        Email: info@almasaeedstudio.com
                                    </div>
                                </div>

                                <div className="col-sm-4 invoice-col">
                                    THÔNG TIN KHÁCH HÀNG
                                    <div>
                                        <strong>John Doe</strong>
                                        <br />
                                        795 Folsom Ave, Suite 600
                                        <br />
                                        San Francisco, CA 94107
                                        <br />
                                        Phone: (555) 539-1037
                                        <br />
                                        Email: john.doe@example.com
                                    </div>
                                </div>

                                <div className="col-sm-4 invoice-col">
                                    <b>#{order.code}</b>
                                    <br />
                                    <b>Trạng thái:</b> {showStatus(order.status)}
                                    <br />
                                    <b>Ngày tiếp nhận:</b> 2/22/2014
                                    <br />
                                    <b>Hoàn thành/Dự kiến:</b> 968-34567
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="row pb-60">
                        <div className="col-12 table-responsive">
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
                                    {items?.map((orderItem: IOrderDetail) => (
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
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
