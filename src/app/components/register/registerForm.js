'use client';
import React, { useState } from 'react';
import { register } from '@/utils/user';
import { getModels } from '@/utils/branch';

import Link from 'next/link';
function RegisterForm({ brands_data }) {
    const [models, setModels] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [licensePlates, setLicensePlates] = useState('');
    const [automakerId, setAutomakerId] = useState('');
    const [carNameId, setCarNameId] = useState('10');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, SetpasswordConfirmation] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // await register(name, phone, email, licensePlates, automakerId, carNameId, password, passwordConfirmation);
            // console.log('Register successful'); // Handle success (e.g., redirect to a different page)
            // await router.push('/dashboard');
            router.push('/dashboard');
        } catch (error) {
            console.log('Register fail');
            console.error('Register error:', error.message); // Handle Register errors
        }
    };

    const selectBrand = async (e) => {
        try {
            setAutomakerId(e.target.value);
            setCarNameId('');
            const dong_xe = await getModels(e.target.value);
            setModels(dong_xe);
        } catch (error) {}
    };

    return (
        <form onSubmit={handleRegister}>
            <div className="row">
                <div className="col col-md-4">
                    <div className="form-group">
                        <label>Họ Tên</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Họ tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col col-md-4">
                    <div className="form-group">
                        <label>Điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col col-md-4">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col col-md-4">
                    <div className="form-group">
                        <label>Biển số xe</label>
                        <input
                            type="text"
                            name="license_plates"
                            className="form-control"
                            placeholder="Biển số xe"
                            value={licensePlates}
                            onChange={(e) => setLicensePlates(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col col-md-4">
                    <div className="form-group">
                        <label>Hãng xe</label>

                        <select
                            className="form-control"
                            required
                            name="automaker_id"
                            id="automaker_id"
                            onChange={selectBrand}
                        >
                            <option>Chọn hãng xe</option>
                            {brands_data.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col col-md-4">
                    <div className="form-group">
                        <label>Dòng xe</label>
                        <select
                            type="text"
                            className="form-control"
                            placeholder="Dòng xe"
                            name="car_name_id"
                            required
                            onChange={(e) => setCarNameId(e.target.value)}
                        >
                            <option>Chọn dòng xe</option>
                            {models.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Mật khẩu</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Nhập lại mật khẩu</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    value={passwordConfirmation}
                    onChange={(e) => SetpasswordConfirmation(e.target.value)}
                />
            </div>
            <div className="form-check form-group">
                <input className="form-check-input" type="checkbox" value="" id="agree" />
                <label className="form-check-label" htmlFor="agree">
                    Tôi đồng ý với <Link href="#">Điều khoản dịch vụ.</Link>
                </label>
            </div>
            <div className="d-flex align-items-center">
                <button type="submit" className="theme-btn">
                    <i className="far fa-paper-plane"></i> Đăng ký
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;
