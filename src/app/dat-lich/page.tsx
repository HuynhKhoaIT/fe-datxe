'use client';
import React from 'react';
import { getOrders } from '@/utils/order';
import CalendarScheduler from './Calendar';
import { useSession } from 'next-auth/react';
import { mapArrayEventCalendar } from '../domain/EventCalendar';

export default async function Shop() {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const orders = await getOrders(token || '');
    const ordersData = mapArrayEventCalendar(orders);
    return (
        <main className="main">
            <CalendarScheduler ordersData={ordersData || {}} />
        </main>
    );
}
