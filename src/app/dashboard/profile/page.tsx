'use client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ProfileSidebar } from '@/app/components/profile-sidebar/sidebar';
// import { Button, Col, Form, Input, Row, Select } from 'antd';
import { Button, Grid, TextInput, Select, PasswordInput, Group } from '@mantine/core';
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
                    <form name="userProfileForm" onSubmit={onFinish}>
                        <Grid gutter={16}>
                            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                                <TextInput
                                    defaultValue={session?.user?.name ?? ''}
                                    label="Họ tên"
                                    placeholder="Nguyễn Văn A"
                                    onChange={() => setDisabledBtn(false)}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                                <TextInput
                                    label="Email"
                                    defaultValue={session?.user?.email ?? ''}
                                    type="email"
                                    onChange={() => setDisabledBtn(false)}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                                <TextInput
                                    type="tel"
                                    defaultValue={session?.user?.phone ?? ''}
                                    label="Điện thoại"
                                    onChange={() => setDisabledBtn(false)}
                                />
                            </Grid.Col>
                        </Grid>
                        <Grid gutter={16}>
                            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                                <Select
                                    label="Tỉnh thành"
                                    placeholder="Choose..."
                                    onChange={() => setDisabledBtn(false)}
                                ></Select>
                            </Grid.Col>
                            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                                <TextInput
                                    label="Địa chỉ"
                                    placeholder="1234 Main St"
                                    onChange={() => setDisabledBtn(false)}
                                />
                            </Grid.Col>
                        </Grid>
                        <Grid gutter={16}>
                            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                                <PasswordInput label="Nhập Password" onChange={() => setDisabledBtn(false)} />
                            </Grid.Col>
                            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                                <PasswordInput label="Xác thực Password" />
                            </Grid.Col>
                        </Grid>

                        <Group pt={20} justify="end" className="col-12 text-right ">
                            <Button type="submit" disabled={disabledBtn}>
                                Cập nhật
                            </Button>
                        </Group>
                    </form>
                </div>
            </div>
        </div>
    );
}
