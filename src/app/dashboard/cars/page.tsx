'use client';
import React, { useEffect, useState } from 'react';
import { getCars, deleteCar } from '@/utils/car';
import { ICar } from '../../../interfaces/car';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CarItem from './CarItem';
import { Breadcrumb } from 'antd';
export default function CarsPage() {
    // const cars = await getCars();
    const { data: session } = useSession();
    const token = session?.user?.token;

    const [cars, setCars] = useState<ICar>([]);
    const fetchCars = async () => {
        try {
            if (token) {
                const fetchedCars = await getCars(token);
                setCars(fetchedCars ?? []);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };
    useEffect(() => {
        fetchCars();
    }, [token]);

    const handleDeleteCar = async (carId: string) => {
        try {
            await deleteCar(carId, token ?? '');
            fetchCars();
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };
    return (
        <div className="user-profile-wrapper">
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
                        <table className="table text-nowrap">
                            <thead>
                                <tr>
                                    <th>Thông tin</th>
                                    <th>Hãng</th>
                                    <th>Dòng</th>
                                    <th>Năm</th>
                                    <th>Hạn bảo dưỡng</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars?.map((item, index) => (
                                    <CarItem key={item.id} item={item} onDeleteCar={() => handleDeleteCar(item.id)} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
