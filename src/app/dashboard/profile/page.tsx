'use client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ProfileSidebar } from '@/app/components/profile-sidebar/sidebar';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';

import React, { useState } from 'react';
export default function ProfilePage() {
    // const session = await getServerSession(authOptions);
    const { data: session } = useSession();
    const [disabledBtn, setDisabledBtn] = useState(true);
    console.log(session);
    const onFinish = async (values: any) => {
        console.log(values);
        // try {
        //     // Call your updateUserInfo function here with the updated values
        //     await updateUserInfo(values);
        // } catch (error) {
        //     console.error('Error updating user info:', error);
        // }
    };
    return (
        <div className="user-profile-wrapper">
            <div className="user-profile-card profile-ad" style={{ padding: '40px' }}>
                <div className="user-profile-card-header">
                    <h4 className="user-profile-card-title">Thông tin hồ sơ</h4>
                </div>
                <div className="card-body">
                    <Form
                        name="userProfileForm"
                        onFinish={onFinish}
                        initialValues={{
                            name: session?.user?.name || '',
                            phone: session?.user?.phone || '',
                            email: session?.user?.email || '',
                            address: session?.user?.address || '',
                            state: undefined, // Set your default value
                        }}
                        layout="vertical"
                    >
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={124} xl={24}>
                                <Form.Item
                                    label="Họ tên"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your fullname!' }]}
                                >
                                    <Input placeholder="Nguyễn Văn A" onChange={() => setDisabledBtn(false)} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input type="email" onChange={() => setDisabledBtn(false)} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    label="Điện thoại"
                                    name="phone"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input type="tel" onChange={() => setDisabledBtn(false)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    label="Tỉnh thành"
                                    name="state"
                                    rules={[{ required: true, message: 'Please select your state!' }]}
                                >
                                    <Select placeholder="Choose..." onChange={() => setDisabledBtn(false)}>
                                        {/* Add your options here */}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    label="Địa chỉ"
                                    name="address"
                                    rules={[{ required: true, message: 'Please input your address!' }]}
                                >
                                    <Input placeholder="1234 Main St" onChange={() => setDisabledBtn(false)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password onChange={() => setDisabledBtn(false)} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    label="Xác thực Password"
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item className="col-12 text-right">
                            <Button type="primary" htmlType="submit" disabled={disabledBtn}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
