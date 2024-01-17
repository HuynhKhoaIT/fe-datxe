import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        let garageId = {};
        if (searchParams.get('garage')) {
            garageId = Number(searchParams.get('garage'));
        }
        const cars = await prisma.car.findMany({
            where: {
                AND: [
                    {
                        garageId,
                        status: {
                            not: 'DELETE',
                        },
                    }
                ]
            },
            include:{
                customer: true,
                carStyle: true,
                
            }
        });
        return NextResponse.json(cars);
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const json = await request.json();        
        const car = await prisma.car.create({
            data: {                
                customerId: json.customerId,
                numberPlates: json.numberPlates,
                carBrandId: json.carBrandId,
                carNameId: json.carNameId,
                carYearId: json.carYearId,
                carStyleId: json.carStyleId,
                color: json.color,
                vinNumber: json.vinNumber,
                machineNumber: json.machineNumber,
                description: json.description,
                status: json.status,
                garageId: json.garageId,
            },
            include:{
                customer: true,
                carStyle: true
            }
        });

        return new NextResponse(JSON.stringify(car), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
