import { getDistricts } from '@/app/libs/prisma/province';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: Number } }) {
    try {
        let provinceId: Number = 1;
        if (params.id) {
            provinceId = Number(params.id);
        }
        const districts = await getDistricts(Number(provinceId));
        return NextResponse.json(districts);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
