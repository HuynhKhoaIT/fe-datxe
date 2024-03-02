import { NextResponse } from 'next/server';
import { getCarModes } from '@/app/libs/prisma/carName';

export async function GET() {
    try {
        const brands = await getCarModes({});
        return NextResponse.json(brands);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
