'use client';
import React, {  useState } from 'react';
import { Table, Pagination, Badge } from '@mantine/core';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

export default function Orders({ ordersData }: any) {
    const router = useRouter();
    const handleRowClick = (record: any) => {
        router.push(`/dashboard/order/${record.id}`);
    };
    // pagination
    const itemsPerPage: number = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const paginatedData = ordersData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };
    const renderRows = () => {
        return paginatedData?.map((record: any) => (
            <Table.Tr key={record.id} className="row-table" onClick={() => handleRowClick(record)}>
                <Table.Td>{record?.garage?.name}</Table.Td>
                <Table.Td>{record.car?.licensePlates}</Table.Td>
                <Table.Td>{record.code}</Table.Td>
                <Table.Td>
                    <div>
                        <span>{dayjs(record?.arrivalTime).format('DD/MM/YYYY HH:mm')}</span>
                    </div>
                </Table.Td>
                <Table.Td>
                    {record?.status == 1 && (
                        <Badge variant="light" color="yellow">
                            Tiếp nhận
                        </Badge>
                    )}
                    {record?.status == 2 && (
                        <Badge variant="light" color="blue">
                            Báo giá
                        </Badge>
                    )}
                    {record?.status == 7 && (
                        <Badge variant="light" color="green">
                            Hoàn thành
                        </Badge>
                    )}
                </Table.Td>
                <Table.Td>{record.total}</Table.Td>
            </Table.Tr>
        ));
    };

    return (
        <div className="user-profile-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <div className="user-profile-card">
                        <div className="user-profile-card-header">
                            <h4 className="user-profile-card-title">Danh sách đơn hàng</h4>
                        </div>
                        <div className="table-responsive" style={{ overflowY: 'hidden' }}>
                            <Table className={'table-order'}>
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
                                total={Math.ceil(ordersData?.length / itemsPerPage)}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
