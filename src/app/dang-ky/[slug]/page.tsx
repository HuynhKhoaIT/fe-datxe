'use client';
import { useSession } from 'next-auth/react';
import { RegisterFormAccuracy } from '../../components/register/RegisterAccuracy';
import React from 'react';
import { redirect } from 'next/navigation';

export default function RegisterAccuracy() {
    const { data: session } = useSession();
    if (session && session.user) {
        redirect('/dashboard');
    }
    return <RegisterFormAccuracy />;
}
