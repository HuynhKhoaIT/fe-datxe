import { getReviewsGarage } from '@/app/libs/prisma/reviewGarage';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;
        const { searchParams } = new URL(request.url);
        let page = 1;
        let limit = 10;
        if (searchParams.get('page')) {
            page = Number(searchParams.get('page'));
        }
        if (searchParams.get('limit')) {
            limit = Number(searchParams.get('limit'));
        }
        const review = await getReviewsGarage(id, {
            page,
            limit,
        });
        return NextResponse.json(review);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
