// 'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Menu, Button, rem } from '@mantine/core';
import { IconExternalLink, IconLogout, IconEye, IconCaretDownFilled, IconUserCircle } from '@tabler/icons-react';
const cx = classNames.bind(styles);

const SigninButton = () => {
    const { data: session } = useSession();
    const handleItemClick = (event: { preventDefault: () => void }) => {
        event.preventDefault();
    };
    return (
        <>
            <div className={cx('account', 'd-flex align-items-center')}>
                <IconUserCircle />
                <div className={cx('nav__text', 'd-none d-lg-block')}>
                    {!session?.user ? (
                        <Link href="/dang-nhap" className={cx('nav__text-login')} onClick={() => signIn()}>
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
                                    href="/dashboard"
                                    leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Xem hồ sơ
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconExternalLink style={{ width: rem(14), height: rem(14) }} />}
                                    component="a"
                                    href={'/gio-hang'}
                                    // target="_blank"
                                >
                                    Đơn mua
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    component="a"
                                    // href={'/'}
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
