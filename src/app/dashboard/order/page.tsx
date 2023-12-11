import Orders from '@/app/components/dashboard/order/orders';
import { ProfileSidebar } from '@/app/components/profile-sidebar/sidebar';
import { getOrders } from '@/utils/order';
import React from 'react';
export default async function OrderPage() {
    const orders = await getOrders(1);
    return <Orders ordersData={orders} />;
}
