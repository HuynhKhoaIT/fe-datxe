import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const customers = await prisma.customer.findMany({
            where: {
                AND: [
                    {

                        status: {
                            not: 'DELETE',
                        },
                    }
                ]
            },
            include:{
                cars: true
            }
        });
        return NextResponse.json(customers);
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const json = await request.json();        
        const customer = await prisma.customer.create({
            data: {
                fullName: json.fullName,
                phoneNumber: json.phoneNumber,
                cityId: json.cityId,
                districtId: json.districtId,
                wardId: json.wardId,
                address: json.address,
                dob: json.dob,
                description: json.description,
                sex: json.sex,
                garageId: json.garageId,
                status: json.status,
            },
            include:{
                cars: true
            }
        });

        return new NextResponse(JSON.stringify(customer), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
