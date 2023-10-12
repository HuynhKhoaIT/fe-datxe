'use client';
import { faArrowRightFromBracket, faCircleUser, faSortDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import LoginForm from '../login/LoginForm';

const cx = classNames.bind(styles);

const SigninButton = () => {
    const { data: session } = useSession();
    return (
        <>
            <div className={cx('account', 'd-flex align-items-center')}>
                <FontAwesomeIcon className={cx('icon-user')} icon={faCircleUser} />
                <div className={cx('nav__text', 'd-none d-lg-block')}>
                    {!session?.user ? (
                        <Link href="/dang-nhap" className={cx('nav__text-login')} onClick={() => signIn()}>
                            Đăng nhập
                        </Link>
                    ) : (
                        <HeadlessTippy
                            delay={[0, 700]}
                            interactive
                            placement="bottom-end"
                            trigger="click"
                            render={(attrs) => (
                                <div className={cx('accout-result')}>
                                    <Link href={'/account'}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <p>Xem hồ sơ</p>
                                    </Link>
                                    <Link href={'/gio-hang'}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <p>Đơn mua</p>
                                    </Link>
                                    <Link href={'/'} onClick={() => signOut()}>
                                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                        <p>Đăng Xuất</p>
                                    </Link>
                                </div>
                            )}
                            // onHide={handleResetMenu}
                            hideOnClick
                        >
                            <div className={cx('d-flex')}>
                                <p>{session?.user.name}</p>
                                <FontAwesomeIcon icon={faSortDown} className={cx('icon-down')} />
                            </div>
                        </HeadlessTippy>
                    )}
                </div>
            </div>
        </>
    );
};

export default SigninButton;
