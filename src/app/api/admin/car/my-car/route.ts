import { createCar, createMyCars, getCars } from '@/app/libs/prisma/car';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = Number(process.env.GARAGE_DEFAULT);
            const { searchParams } = new URL(request.url);
            const requestData = {
                garageId: garageId,
                customerId: session.user?.id,
                status: 'PUBLIC',
            };
            const cars = await getCars(requestData);

            return NextResponse.json(cars);
        } else {
            throw new Error('Chua dang nhap');
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            const json = await request.json();
            let garageId = Number(process.env.GARAGE_DEFAULT);
            json.garageId = garageId;
            json.phoneNumber = session.user?.phone;
            const car = await createMyCars(json);
            return new NextResponse(JSON.stringify(car), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
