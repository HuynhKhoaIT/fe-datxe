import { createOrder, getOrders, updateOrderStatus } from '@/app/libs/prisma/order';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session = await getServerSession(authOptions);
        if (session) {
            const orderId = json.id;
            const orderStatus = json.status;
            const order = await updateOrderStatus(orderId, orderStatus);
            return new NextResponse(JSON.stringify(order), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
