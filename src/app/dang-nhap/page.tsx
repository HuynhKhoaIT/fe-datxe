'use client';
import { useSession } from 'next-auth/react';
import LoginForm from '../components/login/LoginForm';
import React from 'react';
import { redirect } from 'next/navigation';

export default function Login() {
    const { data: session } = useSession();
    if (session && session.user) {
        redirect('/dashboard');
    }
    return (
        <main className="main">
            <div className="login-area py-120">
                <div className="container">
                    <div className="col-md-5 mx-auto">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
