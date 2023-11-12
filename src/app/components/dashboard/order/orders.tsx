'use client';
import React, { useEffect, useState } from 'react';
import { Table, Spin } from 'antd';
import { getGarage } from '@/utils/garage';
import { getOrders, showStatus } from '@/utils/order';
import { IOrder } from '@/interfaces/order';
import { useSession } from 'next-auth/react';
import { getCar } from '@/utils/car';

export default function Orders() {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [ordersData, setOrdersData] = useState<IOrder[]>([]);
    const [ordersData2, setOrdersData2] = useState<IOrder[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await getOrders(token ?? '', 1);
                setOrdersData(orders ?? []);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    const fetchOrderData = async (garageId: string) => {
        const garageData = await getGarage(garageId);
        return garageData?.data;
    };
    const fetchCarData = async (carId: string) => {
        const carData = await getCar(token ?? '', carId ?? '');
        return carData;
    };
    useEffect(() => {
        setLoading(true);
        const updateTableData = async () => {
            const updatedData = await fetchDataForTable();

            setOrdersData2(updatedData);
            setLoading(false);
        };
        updateTableData();
    }, [ordersData]);

    const fetchDataForTable = async (): Promise<IOrder[]> => {
        const updatedCars = await Promise.all(
            ordersData.map(async (order: IOrder) => {
                if (order.garageId && order.carId) {
                    const garage = await fetchOrderData(order.garageId);
                    const car = await fetchCarData(order.carId);
                    order.status = showStatus(order.status);
                    return { ...order, garage, car };
                } else {
                    return order;
                }
            }),
        );
        return updatedCars;
    };

    const columns: any = [
        {
            title: 'Tên chuyên gia',
            dataIndex: ['garage', 'name'],
            width: 140,
        },
        {
            title: 'Biển số',
            dataIndex: ['car', 'licensePlates'],
        },
        {
            title: 'Mã đơn hàng',
            dataIndex: 'code',
        },
        {
            title: 'Ngày sửa',
            dataIndex: 'date',
        },
        {
            title: 'Giờ sửa',
            dataIndex: 'time',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
        },
        {
            title: 'Tổng đơn hàng',
            dataIndex: 'total',
        },
    ];

    return (
        <div className="user-profile-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <div className="user-profile-card">
                        <h4 className="user-profile-card-title">Danh sách đơn hàng</h4>
                        {/* <Spin spinning={loading}> */}
                        <div className="table-responsive">
                            <Table
                                loading={loading}
                                pagination={{ pageSize: 6 }}
                                dataSource={ordersData2}
                                columns={columns}
                            />
                        </div>
                        {/* </Spin> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
