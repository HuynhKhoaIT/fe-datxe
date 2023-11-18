'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { getCars, deleteCar } from '@/utils/car';
import { ICar } from '../../../interfaces/car';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CarItem from './CarItem';
// import { Breadcrumb, Button, Input, Modal, Spin, Tooltip } from 'antd';
import { getBrand } from '@/utils/branch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faChevronRight, faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import PreviewModal from './PreviewModal';
import UpdateModal from './UpdateModal';
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import AddCarModal from './AddCarModal';
import { Table, Checkbox, Radio, Loader, Center, Button, Modal, Group, Pagination } from '@mantine/core';

export default function CarsPage() {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [detail, setDetail] = useState({});
    const [deleteRow, setDeleteRow] = useState('');
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message: string) => {
        api.info({
            message: `Thành công`,
            description: message,
            icon: <CheckOutlined style={{ color: 'green' }} />,
        });
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    // Mở modal xem chi tiết
    const showDetails = (e: React.MouseEvent<HTMLElement, MouseEvent>, record: object) => {
        e.stopPropagation();
        setDetail(record);
        setIsModalOpen(true);
    };

    // mở modal edit
    const showUpdateModal = (record: object) => {
        setDetail(record);
        setIsUpdateModalOpen(true);
    };
    // Mở modal thêm car
    const showAddModal = () => {
        setIsAddModalOpen(true);
    };
    // Đóng modal
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsUpdateModalOpen(false);
        setIsAddModalOpen(false);
    };

    const handleDeleteOk = () => {
        setIsModalDeleteOpen(false);
        handleDeleteCar(deleteRow);
    };
    const handleOpenModalDelete = (record: any) => {
        setIsModalDeleteOpen(true);
        setDeleteRow(record.id);
    };
    const handleDeleteCancel = () => {
        setIsModalDeleteOpen(false);
    };
    const [cars, setCars] = useState<ICar[]>([]);
    const [cars2, setCars2] = useState<ICar[]>([]);

    const fetchCars = async () => {
        console.log('update or delete');
        try {
            if (token) {
                const fetchedCars = await getCars(token);
                setCars(fetchedCars ?? []);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };
    useEffect(() => {
        fetchCars();
    }, [token]);
    const fetchBrandData = async (automakerId: number) => {
        const brandData = await getBrand(automakerId);
        return brandData.name;
    };

    const fetchModelData = async (carNameId: number) => {
        const modelData = await getBrand(carNameId);
        return modelData.name;
    };
    useEffect(() => {
        setLoading(true);
        const updateTableData = async () => {
            const updatedData = await fetchDataForTable();
            setCars2(updatedData);
            setLoading(false);
        };
        updateTableData();
    }, [cars]);

    const fetchDataForTable = async (): Promise<ICar[]> => {
        const updatedCars = await Promise.all(
            cars.map(async (car: ICar) => {
                if (car.automakerId && car.carNameId) {
                    const brandName = await fetchBrandData(car.automakerId);
                    const modelName = await fetchModelData(car.carNameId);
                    return { ...car, brandName, modelName };
                } else {
                    return car;
                }
            }),
        );
        return updatedCars;
    };

    const handleDeleteCar = async (carId: string) => {
        try {
            await deleteCar(carId, token ?? '');
            openNotification('Xoá thành công');

            fetchCars();
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const [selectedRow, setSelectedRow] = useState<number>();
    const itemsPerPage: number = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const paginatedData = cars2.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

        return paginatedData.map((record) => (
            <Table.Tr key={record.id}>
                <Table.Td w={'100px'}>
                    <Radio checked={selectedRow === record.id} onChange={() => setSelectedRow(record.id)} />
                </Table.Td>
                <Table.Td>{record.licensePlates}</Table.Td>
                <Table.Td>{record.color}</Table.Td>
                <Table.Td>{record.brandName}</Table.Td>
                <Table.Td>{record.modelName}</Table.Td>
                <Table.Td>{record.registrationDate}</Table.Td>
                <Table.Td>
                    <Button size="xs" variant="transparent" onClick={(e) => showDetails(e, record)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Button
                        size="xs"
                        style={{ margin: '0 5px' }}
                        variant="transparent"
                        color="gray"
                        onClick={() => showUpdateModal(record)}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button size="xs" variant="transparent" color="red" onClick={(e) => handleOpenModalDelete(record)}>
                        <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                    </Button>
                </Table.Td>
            </Table.Tr>
        ));
    };

    return (
        <div className="user-profile-wrapper">
            {contextHolder}

            {/* <Breadcrumb
                style={{ padding: '16px 20px', position: 'absolute' }}
                items={[
                    {
                        title: (
                            <Link href="/dashboard" style={{ color: '#1890ff' }}>
                                Tổng quan
                            </Link>
                        ),
                    },
                    {
                        title: 'Danh sách xe',
                    },
                ]}
            /> */}
            <div className="user-profile-card profile-ad" style={{ padding: '40px' }}>
                <div className="user-profile-card-header">
                    <h4 className="user-profile-card-title">Xe của tôi</h4>
                    <div className="user-profile-card-header-right">
                        <div className="user-profile-search">
                            <div className="form-group">
                                {/* <Search
                                    placeholder="input search text"
                                    allowClear
                                    // onSearch={onSearch}
                                    style={{ width: 200 }}
                                /> */}
                            </div>
                        </div>
                        <Button className="theme-btn" onClick={() => showAddModal()}>
                            Thêm xe
                        </Button>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th align="center">Mặc định</Table.Th>
                                    <Table.Th>Biển số</Table.Th>
                                    <Table.Th>Màu xe</Table.Th>
                                    <Table.Th>Hãng xe</Table.Th>
                                    <Table.Th>Dòng xe</Table.Th>
                                    <Table.Th>Ngày đăng ký</Table.Th>
                                    <Table.Th>Hành động</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{renderRows()}</Table.Tbody>
                        </Table>
                        <Pagination
                            style={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}
                            total={Math.ceil(cars2.length / itemsPerPage)}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <Modal title="Delete" opened={isModalDeleteOpen} onClose={handleDeleteCancel}>
                <div>Bạn có muốn xoá không?</div>
                <Group justify="end" style={{ marginTop: 10 }}>
                    <Button
                        variant="filled"
                        key="cancel"
                        onClick={handleDeleteCancel}
                        color="red"
                        leftSection={<FontAwesomeIcon icon={faBan} />}
                    >
                        Huỷ bỏ
                    </Button>
                    <Button
                        style={{ marginLeft: '12px' }}
                        onClick={handleDeleteOk}
                        variant="filled"
                        leftSection={<FontAwesomeIcon icon={faChevronRight} />}
                    >
                        Tiếp tục
                    </Button>
                </Group>
            </Modal>
            <UpdateModal
                open={isUpdateModalOpen}
                fetchCars={() => fetchCars()}
                onCancel={handleCancel}
                width={800}
                data={detail ? detail : {}}
            />
            <AddCarModal width={800} open={isAddModalOpen} onCancel={handleCancel} />
            <PreviewModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} data={detail} />
        </div>
    );
}
