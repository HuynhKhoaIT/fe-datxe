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
        if ((!json.customerId || json.customerId == 0) && json.phoneNumber) {
            // check and create customer
            // check customer via phone number
            let phoneNumber = json.phoneNumber;
            if(phoneNumber){
                const customerFind = await prisma.customer.findFirstOrThrow({
                    where: { phoneNumber: phoneNumber }
                })
            }
            
            // if(customerFind.){

            // }
            // end check customer
        }
        if (!json.carId) {
            return new NextResponse("Missing 'carId' parameter");
        }
        const order = await prisma.order.create({
            data: {
                code: 'abc',
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
