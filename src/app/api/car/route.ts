import { createCar, getCars } from '@/app/libs/prisma/car';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (session) {
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const { searchParams } = new URL(request.url);
            let page = 1;
            if (searchParams.get('page')) {
                page = Number(searchParams.get('page'));
            }
            const requestData = {
                s: searchParams.get('s'),
                limit: 10,
                take: 10,
                page: page,
                garageId: garageId,
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
