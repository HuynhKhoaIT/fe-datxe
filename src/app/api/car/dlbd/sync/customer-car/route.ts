import { createCar, syncCarFromDLBD } from '@/app/libs/prisma/car';
import { syncCustomerAndCarFromDLBD } from '@/app/libs/prisma/customer';
import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const car = await syncCustomerAndCarFromDLBD(json);
        return new NextResponse(JSON.stringify(car), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
