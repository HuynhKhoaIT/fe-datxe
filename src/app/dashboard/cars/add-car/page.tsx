import { getBrands, getModels } from '@/utils/branch';
import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import AddCartForm from './AddCarForm';
export default async function AddCar() {
    return (
        <main className="main">
            <div className="login-area py-120">
                <div className="container">
                    <div className="col-md-9 mx-auto">
                        <div className="login-form">
                            <div className="login-header">
                                <img src="../../assets/img/logo/logo.png" alt="" />
                                <h4>Thêm xe</h4>
                            </div>
                            <AddCartForm />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- register area end --> */}
        </main>
    );
}
