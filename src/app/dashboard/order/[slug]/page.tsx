import React from 'react';
import { IOrderDetail } from '@/interfaces/orderDetail';
import { getGarage } from '@/utils/garage';
import { getOrder, getOrderDetail, showStatus } from '@/utils/order';
import InfoGarage from '@/app/components/garage/infoGarage';
import { IGarage } from '@/interfaces/garage';
import OrderDetailItem from '@/app/components/dashboard/order/orderDetail';
export default async function SingleOrder({ params }: { params: { slug: number } }) {
    const items: IOrderDetail = await getOrderDetail(params.slug, '1436|5ZgrHyobWoDHP4gS3PtWm2vVcMWNDgeFZk2p4DzY');
    const order = await getOrder(params.slug, '1436|5ZgrHyobWoDHP4gS3PtWm2vVcMWNDgeFZk2p4DzY');
    const garageId: number = order?.garageId;
    const infoGara: IGarage = await getGarage(garageId);
    return (
        <main className="main">
            <div className="order-item-single bg pt-60">
                <div className="container">
                    <div className="card text-left mb-40">
                        <div className="card-body">
                            <div className="row invoice-info">
                                <InfoGarage infoGara={infoGara} />
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
                            <OrderDetailItem items={items} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
