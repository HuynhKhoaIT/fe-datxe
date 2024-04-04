import { getProductsBestSeller } from '@/app/libs/prisma/product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const json = {
            garageId: 1,
            includeGarage: searchParams.get('includeGarage'),
        };
        const data = await getProductsBestSeller('token', json);
        return NextResponse.json(data);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
