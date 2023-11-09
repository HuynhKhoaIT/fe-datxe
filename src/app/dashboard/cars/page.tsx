'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { getCars, deleteCar } from '@/utils/car';
import { ICar } from '../../../interfaces/car';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CarItem from './CarItem';
import { Breadcrumb, Button, Modal, Spin, Table, Tooltip } from 'antd';
import { getBrand } from '@/utils/branch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import PreviewModal from './PreviewModal';
import UpdateModal from './UpdateModal';
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

export default function CarsPage() {
    const { data: session } = useSession();

    const token = session?.user?.token;
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const showDetails = (e: React.MouseEvent<HTMLElement, MouseEvent>, record: object) => {
        e.stopPropagation();
        setDetail(record);
        setIsModalOpen(true);
    };
    const showUpdateModal = (record: object) => {
        setDetail(record);
        setIsUpdateModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsUpdateModalOpen(false);
    };
    const handleUpdateOk = () => {
        setIsUpdateModalOpen(false);
        openNotification('Cập nhật thành công');

        fetchCars();
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
        console.log('cars2');
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

    const columns = [
        {
            title: 'Biển số',
            dataIndex: 'licensePlates',
        },
        {
            title: 'Màu xe',
            dataIndex: 'color',
        },
        {
            title: 'Hãng',
            dataIndex: 'brandName',
            render: (brandName: string) => {
                return <div>{brandName}</div>;
            },
        },
        {
            title: 'Dòng',
            dataIndex: 'modelName',
            render: (modelName: string) => {
                return <div>{modelName}</div>;
            },
        },
        {
            title: 'Registration Date',
            dataIndex: 'registrationDate',
        },

        {
            title: 'Hàng động',
            render: (record: object) => (
                <span>
                    <Tooltip title="Details">
                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faEye} />}
                            onClick={(e) => showDetails(e, record)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            type="default"
                            icon={<FontAwesomeIcon icon={faPen} />}
                            onClick={() => showUpdateModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            danger
                            icon={<FontAwesomeIcon icon={faTrash} />}
                            onClick={(e) => handleOpenModalDelete(record)}
                        />
                    </Tooltip>
                </span>
            ),
        },
    ];
    return (
        <div className="user-profile-wrapper">
            {contextHolder}

            <Breadcrumb
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
            />
            <div className="user-profile-card profile-ad" style={{ padding: '40px' }}>
                <div className="user-profile-card-header">
                    <h4 className="user-profile-card-title">Xe của tôi</h4>
                    <div className="user-profile-card-header-right">
                        <div className="user-profile-search">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Tìm..." />
                                <i className="far fa-search"></i>
                            </div>
                        </div>
                        <Link href="cars/add-car" className="theme-btn">
                            <span className="far fa-plus-circle"></span>Thêm xe
                        </Link>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <Spin spinning={loading}>
                            <Table dataSource={cars2} columns={columns} />
                        </Spin>
                    </div>
                </div>
            </div>
            <Modal title="Delete" open={isModalDeleteOpen} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
                <p>Bạn có muốn xoá không?</p>
            </Modal>
            <UpdateModal
                open={isUpdateModalOpen}
                onOk={handleUpdateOk}
                fetchCars={() => fetchCars()}
                onCancel={handleCancel}
                width={800}
                data={detail ? detail : {}}
            />
            <PreviewModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} data={detail} />
        </div>
    );
}
