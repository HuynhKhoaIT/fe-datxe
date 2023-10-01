'use client';
import React, { useState } from 'react';
import { register } from '@/utils/user';

import Link from 'next/link';
function RegisterForm({ brands_data }) {
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
            await register(name, phone, email, licensePlates, automakerId, carNameId, password, passwordConfirmation);
            console.log('Register successful'); // Handle success (e.g., redirect to a different page)
        } catch (error) {
            console.log('Register fail');
            console.error('Register error:', error.message); // Handle Register errors
        }
    };
    console.log(brands_data);
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

                        <select name="automaker_id" id="automaker_id" onChange={(e) => setAutomakerId(e.target.value)}>
                            {brands_data.map((brand) => (
                                <option key={brand.id} value={brand.name}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Hãng xe"
                            value={automakerId}
                            name="automaker_id"
                            readOnly // Đặt readOnly để ngăn người dùng chỉnh sửa trực tiếp
                        />
                    </div>
                </div>
                <div className="col col-md-4">
                    <div className="form-group">
                        <label>Dòng xe</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Dòng xe"
                            value="10"
                            name="car_name_id"
                        />
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
                <label>Password Confirmation</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Your Password"
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
