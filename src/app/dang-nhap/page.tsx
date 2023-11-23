'use client';
import { useSession } from 'next-auth/react';
import LoginFormInput from '../components/login/Login';
import React from 'react';
import { redirect } from 'next/navigation';
import LoginForm from '../components/login/LoginForm';

export default function Login() {
    const { data: session } = useSession();
    if (session && session.user) {
        redirect('/dashboard');
    }
    return <LoginFormInput />;
}
