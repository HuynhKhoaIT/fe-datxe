'use client';
import { faArrowRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const SigninButton = () => {
    const { data: session } = useSession();
    if (session && session.user) {
        return (
            <div className="header-top-link">
                <Link href="/dashboard" className="">
                    {session.user.name}
                </Link>
                <button onClick={() => signOut()}>Đăng xuất</button>
            </div>
        );
    }
    return (
        <div className="header-top-link">
            <Link href="/dang-nhap" onClick={() => signIn()}>
                <FontAwesomeIcon icon={faArrowRightToBracket} /> Đăng nhập
            </Link>
        </div>
    );
};

export default SigninButton;
