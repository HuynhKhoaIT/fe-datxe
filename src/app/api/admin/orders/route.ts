import { createOrder, getOrders } from '@/app/libs/prisma/order';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { sendSMSOrder } from '@/utils/order';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const { searchParams } = new URL(request.url);
            let page = 1;
            let limit = 10;
            if (searchParams.get('page')) {
                page = Number(searchParams.get('page'));
            }
            if (searchParams.get('limit')) {
                limit = Number(searchParams.get('limit'));
            }
            const requestData = {
                s: searchParams.get('s'),
                step: searchParams.get('step'),
                method: searchParams.get('method'),
                createdById: searchParams.get('user'),
                customerId: searchParams.get('customerId'),
                carId: searchParams.get('carId'),
                limit: limit,
                page: page,
                garageId: garageId,
            };
            const orders = await getOrders(garageId, requestData);
            return NextResponse.json(orders);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session = await getServerSession(authOptions);
        if (session) {
            json.garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const order = await createOrder(json);
            return new NextResponse(JSON.stringify(order), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
