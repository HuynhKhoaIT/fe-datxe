import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: {
                    not: 'DELETE',
                },
            },
        });
        return NextResponse.json(orders);
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const json = await request.json();
        if (!json.customerId) {
            return new NextResponse("Missing 'customerId' parameter");
        }
        if (!json.carId) {
            return new NextResponse("Missing 'carId' parameter");
        }
        // const order = await prisma.order.create({
        //     data: {
        //         code: json.code,
        //         customerId: json.customerId,
        //         carId: json.carId,
        //         dateTime: json.dateTime,
        //     },
        // });

        return new NextResponse(JSON.stringify({}), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
