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
            include: {
                serviceAdvisor: true,
                car: true,
                customer: true,
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
        const order = await prisma.order.create({
            data: {
                code: 'abc',
                customerId: json.customerId,
                carId: json.carId,
                dateTime: json.dateTime,
                customerRequest: json.customerRequest,
                customerNote: json.customerNote,
                note: json.note,
                priorityLevel: json.priorityLevel,
                orderCategoryId: 1,
                brandId: json.brandId,
                modelId: json.modelId,
                yearId: json.yearId,
                garageId: json.garageId,
                serviceAdvisorId: json.serviceAdvisorId,
            },
            include: {
                serviceAdvisor: true,
                car: true,
                customer: true,
            },
        });

        return new NextResponse(JSON.stringify(order), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
