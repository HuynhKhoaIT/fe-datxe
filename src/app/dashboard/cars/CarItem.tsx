'use client';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { ICar } from '@/interfaces/car';
import { DatePicker, Modal } from 'antd';
import styles from './add-car/AddCar.module.scss';
import classNames from 'classnames/bind';
import { IBrand } from '@/interfaces/brand';
import PreviewModal from './PreviewModal';
import { deleteCar } from '@/utils/car';
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { getBrand } from '@/utils/branch';

const cx = classNames.bind(styles);
interface CarItemProps {
    item: any; // Replace 'any' with the actual type of 'item'
    onDeleteCar(): void;
}
const CarItem: React.FC<CarItemProps> = ({ item, onDeleteCar }) => {
    const { data: session } = useSession();
    const token = session?.user?.token;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [brand, setBrand] = useState<IBrand[]>();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleDeleteOk = () => {
        setIsModalDeleteOpen(false);
        onDeleteCar();
        // handledeleteCar();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleDeleteCancel = () => {
        setIsModalDeleteOpen(false);
    };

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message: string) => {
        api.info({
            message: `Thành công`,
            description: message,
            icon: <CheckOutlined style={{ color: 'green' }} />,
        });
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const brand: IBrand[] = await getBrand(item.brand_id);
                setBrand(brand);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handledeleteCar = async () => {
        try {
            const createdCar = await deleteCar(item.id, token ?? '');
            openNotification('Xoá thành công');
        } catch (error) {
            console.error('Error delete car:', error);
        }
    };
    return (
        <>
            {contextHolder}
            <tr>
                <td>
                    <div className="table-list-info">
                        <a href="#">
                            <img src="/assets/img/car/01.jpg" alt="" />
                            <div className="table-list-content">
                                <h6>{item.licensePlates}</h6>
                            </div>
                        </a>
                    </div>
                </td>
                <td></td>
                <td>5 days ago</td>
                <td>$50,650</td>
                <td>
                    <span className="badge badge-success">Active</span>
                </td>
                <td>
                    <i
                        onClick={showModal}
                        className="btn btn-outline-secondary btn-sm rounded-2"
                        data-bs-toggle="tooltip"
                        title="Details"
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </i>
                    <i
                        onClick={showModal}
                        className="btn btn-outline-secondary btn-sm rounded-2"
                        data-bs-toggle="tooltip"
                        title="Edit"
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </i>
                    <i
                        onClick={() => setIsModalDeleteOpen(true)}
                        className="btn btn-outline-danger btn-sm rounded-2"
                        data-bs-toggle="tooltip"
                        title="Delete"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </i>
                </td>
            </tr>
            <Modal title="Delete" open={isModalDeleteOpen} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
                <p>Bạn có muốn xoá không?</p>
            </Modal>
            <PreviewModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} data={item} />
        </>
    );
};
export default CarItem;
