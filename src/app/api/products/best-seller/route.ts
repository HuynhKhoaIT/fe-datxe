import { NextResponse } from 'next/server';
import { getProductsBestSeller } from '@/app/libs/prisma/product';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const json = {
            garageId: 1,
            includeGarage: searchParams.get('includeGarage'),
        };
        // return NextResponse.json(json);
        return await getProductsBestSeller('token', json);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
