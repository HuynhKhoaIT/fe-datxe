import React from 'react';
import { getSchedule } from '@/utils/order';
import CalendarScheduler from './Calendar';
import { mapArrayEventCalendar } from '../domain/EventCalendar';

export default async function Shop() {
    const orders = await getSchedule();
    const ordersData = mapArrayEventCalendar(orders);

    return (
        <main className="main">
            <CalendarScheduler ordersData={ordersData || {}} />
        </main>
    );
}
