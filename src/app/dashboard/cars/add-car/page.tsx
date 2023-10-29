import { getBrands, getModels } from '@/utils/branch';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, DatePicker } from 'antd';
import AddCartForm from './AddCarForm';
import Link from 'next/link';
export default async function AddCar() {
    return (
        <main className="main">
            <div className="login-area">
                <Breadcrumb
                    style={{ padding: '16px 20px', position: 'absolute' }}
                    items={[
                        {
                            title: (
                                <Link href="../" style={{ color: '#1890ff' }}>
                                    Tổng quan
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <Link href="./" style={{ color: '#1890ff' }}>
                                    Danh sách xe
                                </Link>
                            ),
                        },
                        {
                            title: 'Thêm xe',
                        },
                    ]}
                />
                <div className=" mx-auto">
                    <div className="login-form">
                        <div className="login-header">
                            <img src="../../assets/img/logo/logo.png" alt="" />
                            <h4>Thêm xe</h4>
                        </div>
                        <AddCartForm />
                    </div>
                </div>
            </div>
            {/* <!-- register area end --> */}
        </main>
    );
}
