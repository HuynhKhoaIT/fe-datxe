import { createCar, syncCarFromDLBD } from '@/app/libs/prisma/car';
import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        // const session = await getServerSession(authOptions);
        const car = await syncCarFromDLBD(json.car, json.customer);
        return new NextResponse(JSON.stringify(car), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
