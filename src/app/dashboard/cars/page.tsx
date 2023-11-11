'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { getCars, deleteCar } from '@/utils/car';
import { ICar } from '../../../interfaces/car';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CarItem from './CarItem';
import { Breadcrumb, Button, Input, Modal, Spin, Table, Tooltip } from 'antd';
import { getBrand } from '@/utils/branch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import PreviewModal from './PreviewModal';
import UpdateModal from './UpdateModal';
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import AddCarModal from './AddCarModal';
const { Search } = Input;

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

    const columns: any = [
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
            align: 'center',
            width: 140,
            render: (record: object) => (
                <span>
                    <Tooltip placement="bottom" title="Chi tiết">
                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faEye} />}
                            onClick={(e) => showDetails(e, record)}
                        />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Chỉnh sửa">
                        <Button
                            style={{ margin: '0 5px' }}
                            type="default"
                            icon={<FontAwesomeIcon icon={faPen} />}
                            onClick={() => showUpdateModal(record)}
                        />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Xoá">
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
                                <Search
                                    placeholder="input search text"
                                    allowClear
                                    // onSearch={onSearch}
                                    style={{ width: 200 }}
                                />
                            </div>
                        </div>
                        <Button className="theme-btn" onClick={() => showAddModal()}>
                            Thêm xe
                        </Button>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <Table loading={loading} dataSource={cars2} columns={columns} />
                    </div>
                </div>
            </div>
            <Modal title="Delete" open={isModalDeleteOpen} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
                <p>Bạn có muốn xoá không?</p>
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
