import { createGarage, getGarageIdByDLBDID, getGarages } from '@/app/libs/prisma/garage';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            const { searchParams } = new URL(request.url);
            let requestData = {
                limit: 10,
                page: 1,
                garageId: garageId,
            };
            if (searchParams.get('limit')) {
                requestData.limit = Number(searchParams.get('limit'));
            }
            if (searchParams.get('page')) {
                requestData.page = Number(searchParams.get('page'));
            }

            const garages = await getGarages(requestData);
            return NextResponse.json(garages);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const errors: string[] = [];
        const garage = await createGarage(json);
        return NextResponse.json({ garage });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
