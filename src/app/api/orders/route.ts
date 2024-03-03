import { createOrder, getOrders } from '@/app/libs/prisma/order';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { sendSMSOrder } from '@/utils/order';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        // console.log(session);
        const { searchParams } = new URL(request.url);
        let garageId = 0;
        if (searchParams.get('garage')) {
            garageId = Number(searchParams.get('garage'));
        }

        // if()
        const requestData = {
            s: searchParams.get('s'),
            createdById: searchParams.get('user'),
            limit: searchParams.get('limit'),
            page: searchParams.get('page'),
        };
        const orders = await getOrders(garageId, requestData);
        return NextResponse.json(orders);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const order = await createOrder(json);
        return new NextResponse(JSON.stringify(order), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
