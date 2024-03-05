import { createCar, getCars } from '@/app/libs/prisma/car';
import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        let garageId = {};
        if (searchParams.get('garage')) {
            garageId = Number(searchParams.get('garage'));
        }
        const cars = await getCars({});
        return NextResponse.json(cars);
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const car = await createCar(json);
        return new NextResponse(JSON.stringify(car), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
