import { createCar, getCars } from '@/app/libs/prisma/car';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { getPlatesNumberFromImg } from '@/utils/car';

export async function POST(request: NextRequest) {
    try {
        const json = await request.json();
        const data = await getPlatesNumberFromImg(json.img);
        return Response.json({ data });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
