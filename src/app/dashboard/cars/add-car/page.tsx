import { getBrands, getModels } from '@/utils/branch';
import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import AddCartForm from './AddCarForm';
export default async function AddCar() {
    return (
        <main className="main">
            <div className="user-profile pt-40 pb-40">
                <div className="container">
                    <AddCartForm />
                </div>
            </div>
        </main>
    );
}
