import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;

        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const session = await getServerSession(authOptions);
        if (1) {
            const orders = await prisma.order.findUnique({
                where: {
                    id: parseInt(id.toString()),
                },
                include: {
                    serviceAdvisor: true,
                    car: true,
                    customer: true,
                },
            });
            return NextResponse.json(orders);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const session = await getServerSession(authOptions);
        if (1) {
            const id = params.id;
            let createdBy = 1;
            let garageId = 1;
            if (!id) {
                return new NextResponse("Missing 'id' parameter");
            }
            const json = await request.json();
            
            if (session?.user?.id) {
                createdBy = Number(session.user.id);
                garageId = Number(session.user.garageId);
            }
            let orderUpdateData = {
                customerId: parseInt(json.customerId),
                carId: parseInt(json.carId),
                dateTime: json.dateTime,
                customerRequest: json.customerRequest,
                customerNote: json.customerNote,
                note: json.note,
                priorityLevel: parseInt(json.priorityLevel),
                orderCategoryId: 1,
                brandId: parseInt(json.brandId),
                modelId: parseInt(json.modelId),
                yearId: parseInt(json.yearId),
                garageId: parseInt(json.garageId),
                serviceAdvisorId: parseInt(json.serviceAdvisorId),
            };
            const updatedOrder = await prisma.order.update({
                where: {
                    id: Number(id),
                },
                data: orderUpdateData,
                include: {
                    serviceAdvisor: true,
                    car: true,
                    customer: true,
                },
            });

            return new NextResponse(JSON.stringify(updatedOrder), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const id = params.id;
    if (!id) {
        return new NextResponse("Missing 'id' parameter");
    }

    const order = await prisma.order.update({
        where: {
            id: parseInt(id.toString()),
        },
        data: {
            status: 'DELETE',
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
