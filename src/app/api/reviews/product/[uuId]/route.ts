import { NextRequest, NextResponse } from 'next/server';
import { getReviewsProduct } from '@/app/libs/prisma/reviewProduct';

export async function GET(request: NextRequest, { params }: { params: { uuId: string } }) {
    try {
        const uuId = params.uuId;
        const { searchParams } = new URL(request.url);
        let page = 1;
        let limit = 10;
        if (searchParams.get('page')) {
            page = Number(searchParams.get('page'));
        }
        if (searchParams.get('limit')) {
            limit = Number(searchParams.get('limit'));
        }
        const review = await getReviewsProduct(uuId, {
            page,
            limit,
        });
        return NextResponse.json(review);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
