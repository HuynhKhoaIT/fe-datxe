import { createOrder, getOrders } from '@/app/libs/prisma/order';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { sendSMSOrder } from '@/utils/order';

export async function GET(request: Request) {
    try {
        const a = await sendSMSOrder(1, 1);
        return NextResponse.json(a);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
