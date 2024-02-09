import { getWards } from '@/app/libs/prisma/province';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { district: Number } }) {
    try {
        let districtId: Number = 1;
        if (params.district) {
            districtId = Number(params.district);
        }
        const wards = await getWards(Number(districtId));
        return NextResponse.json(wards);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
