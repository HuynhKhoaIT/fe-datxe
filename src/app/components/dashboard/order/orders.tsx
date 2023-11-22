'use client';
import React, { useEffect, useState } from 'react';
// import { Table, Spin, Modal } from 'antd';
import { Table, Checkbox, Radio, Loader, Center, Pagination, Modal, Group } from '@mantine/core';
import { getGarage } from '@/utils/garage';
import { getOrders, showStatus } from '@/utils/order';
import { IOrder } from '@/interfaces/order';
import { useSession } from 'next-auth/react';
import { getCar } from '@/utils/car';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export default function Orders() {
    const { data: session } = useSession();
    const router = useRouter();
    const token = session?.user?.token;
    const [ordersData, setOrdersData] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    console.log(session);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await getOrders(token ?? '', 1);
                console.log(orders);
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

    const handleRowClick = (record: any) => {
        router.push(`/dashboard/order/${record.id}`);
    };

    const itemsPerPage: number = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const paginatedData = ordersData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    const renderRows = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan={7}>
                        <Center>
                            <Loader size={36} />
                        </Center>
                    </td>
                </tr>
            );
        }

        return paginatedData.map((record: any) => (
            <Table.Tr key={record.id} className="row-table" onClick={() => handleRowClick(record)}>
                <Table.Td>{record.garage.name}</Table.Td>
                <Table.Td>{record.car.licensePlates}</Table.Td>
                <Table.Td>{record.code}</Table.Td>
                <Table.Td>
                    <div>
                        <span>
                            {dayjs
                                .utc(record?.arrivalTime)
                                .local()
                                .format('DD/MM/YYYY hh:mm')}{' '}
                        </span>
                        {/* <span>{record?.time}</span> */}
                    </div>
                </Table.Td>
                <Table.Td>{record.status}</Table.Td>
                <Table.Td>{record.total}</Table.Td>
            </Table.Tr>
        ));
    };

    return (
        <div className="user-profile-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <div className="user-profile-card">
                        <h4 className="user-profile-card-title">Danh sách đơn hàng</h4>
                        <div className="table-responsive">
                            <Table style={{ overflow: 'hidden' }}>
                                <Table.Thead>
                                    <Table.Tr style={{ background: '#ddd' }}>
                                        <Table.Th>Tên chuyên gia</Table.Th>
                                        <Table.Th>Biển số</Table.Th>
                                        <Table.Th>Mã đơn hàng</Table.Th>
                                        <Table.Th>Ngày sửa</Table.Th>
                                        <Table.Th>Tình trạng</Table.Th>
                                        <Table.Th>Tổng đơn hàng</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{renderRows()}</Table.Tbody>
                            </Table>
                            <Pagination
                                style={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}
                                total={Math.ceil(ordersData.length / itemsPerPage)}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
