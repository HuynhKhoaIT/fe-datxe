import { getProvinces } from '@/app/libs/prisma/province';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const provinces = await getProvinces();
        return NextResponse.json(provinces);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
