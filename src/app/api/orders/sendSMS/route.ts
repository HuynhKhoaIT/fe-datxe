import { createOrder, getOrders } from '@/app/libs/prisma/order';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { sendSMSOrder } from '@/utils/order';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const rs = await sendSMSOrder(json.dataAfter, json.dataAfter, json.dataAfter.customer);
        return NextResponse.json(rs);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
