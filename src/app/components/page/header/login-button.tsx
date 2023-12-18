'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Menu, Button, rem } from '@mantine/core';
import { IconExternalLink, IconLogout, IconEye, IconCaretDownFilled, IconUserCircle } from '@tabler/icons-react';
const cx = classNames.bind(styles);
import { useRouter } from 'next/navigation';

const SigninButton = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const handleCar = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        router.push('/gio-hang');
    };
    const handleDashboard = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        router.push('/dashboard');
    };
    return (
        <>
            <div className={cx('account', 'd-flex align-items-center')}>
                <IconUserCircle />
                <div className={cx('nav__text', 'd-none d-lg-block')}>
                    {!session?.user ? (
                        <Link href="/dang-nhap" className={cx('nav__text-login')}>
                            Đăng nhập
                        </Link>
                    ) : (
                        <Menu width={200} shadow="md">
                            <Menu.Target>
                                <span>
                                    {session?.user.name}
                                    <IconCaretDownFilled />
                                </span>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    component="a"
                                    onClick={handleDashboard}
                                    leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Xem hồ sơ
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconExternalLink style={{ width: rem(14), height: rem(14) }} />}
                                    component="a"
                                    onClick={handleCar}
                                >
                                    Đơn mua
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    component="a"
                                    onClick={() => signOut()}
                                    color="red"
                                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Đăng xuất
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    )}
                </div>
            </div>
        </>
    );
};

export default SigninButton;
